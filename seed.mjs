import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./car-rental-d799a-firebase-adminsdk-fbsvc-ac93a927a8.json', 'utf8'));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

async function seedData() {
  console.log('Starting seed process...');

  // 1. Settings
  console.log('Seeding settings...');
  await db.collection('settings').doc('global').set({
    whatsappNumber: "+91 98765 43210",
    supportEmail: "support@apextravel.com",
    officeAddress: "MG Marg, Gangtok, Sikkim 737101, India"
  });

  // 2. Vehicles
  console.log('Seeding vehicles...');
  const vehicles = [
    {
      id: 'veh-innova',
      name: 'Toyota Innova Crysta',
      type: 'SUV',
      description: 'Premium comfort for long journeys. Excellent legroom and smooth ride across mountain terrain.',
      maxAdults: 4,
      maxChildren: 2,
      maxInfants: 0,
      maxBags: 4,
      luggageCapacity: 'Large Trunk',
      maxBagWeight: 20,
      transmission: 'MANUAL',
      fuelType: 'Diesel',
      ac: true,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60',
      gallery: [
        'https://images.unsplash.com/photo-1502877338535-346ce0d165f5?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=60'
      ],
      status: 'AVAILABLE',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    {
      id: 'veh-swift',
      name: 'Maruti Swift Dzire',
      type: 'SEDAN',
      description: 'Economical and comfortable for small families or couples.',
      maxAdults: 3,
      maxChildren: 1,
      maxInfants: 0,
      maxBags: 2,
      luggageCapacity: 'Medium Trunk',
      maxBagWeight: 15,
      transmission: 'MANUAL',
      fuelType: 'Petrol',
      ac: true,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60',
      gallery: [],
      status: 'AVAILABLE',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    {
      id: 'veh-creta',
      name: 'Hyundai Creta',
      type: 'SUV',
      description: 'Modern compact SUV with great ground clearance, perfect for hilly roads.',
      maxAdults: 4,
      maxChildren: 1,
      maxInfants: 0,
      maxBags: 3,
      luggageCapacity: 'Medium Trunk',
      maxBagWeight: 15,
      transmission: 'AUTOMATIC',
      fuelType: 'Petrol',
      ac: true,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=60',
      gallery: [],
      status: 'AVAILABLE',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    }
  ];

  for (const v of vehicles) {
    const { id, ...data } = v;
    await db.collection('vehicles').doc(id).set(data);
  }

  // 3. Routes
  console.log('Seeding routes...');
  const routes = [
    {
      id: 'route-bagdogra-gangtok',
      name: 'Bagdogra Airport to Gangtok',
      pickup: 'Bagdogra Airport (IXB)',
      destination: 'Gangtok, Sikkim',
      distanceKm: 125,
      estimatedHours: 4.5,
      startingPrice: 3500,
      description: 'A scenic drive along the Teesta River climbing up into the Himalayan foothills. We stop at Sevoke for tea and viewpoints.',
      itinerary: '1. Pickup from Bagdogra Airport\n2. Cross Sevoke Coronation Bridge\n3. Tea break at Teesta Bazaar\n4. Drop-off at Gangtok Hotel',
      isMostBooked: true,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=60',
      gallery: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    {
      id: 'route-njp-darjeeling',
      name: 'NJP to Darjeeling',
      pickup: 'New Jalpaiguri Railway Station',
      destination: 'Darjeeling, West Bengal',
      distanceKm: 70,
      estimatedHours: 3.5,
      startingPrice: 3000,
      description: 'Travel through misty tea gardens via Kurseong up to the Queen of the Hills.',
      itinerary: '1. Pickup from NJP\n2. Cross Rohini Road & Tea Gardens\n3. Stop at Kurseong Tourist Lodge\n4. Drop-off at Darjeeling',
      isMostBooked: false,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop&q=60',
      gallery: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    }
  ];

  for (const r of routes) {
    const { id, ...data } = r;
    await db.collection('routes').doc(id).set(data);
  }

  // 4. Pricing Matrix
  console.log('Seeding pricing...');
  const pricings = [
    { routeId: 'route-bagdogra-gangtok', vehicleId: 'veh-swift', price: 3500, status: 'ACTIVE' },
    { routeId: 'route-bagdogra-gangtok', vehicleId: 'veh-creta', price: 4200, status: 'ACTIVE' },
    { routeId: 'route-bagdogra-gangtok', vehicleId: 'veh-innova', price: 5500, status: 'ACTIVE' },
    { routeId: 'route-njp-darjeeling', vehicleId: 'veh-swift', price: 3000, status: 'ACTIVE' },
    { routeId: 'route-njp-darjeeling', vehicleId: 'veh-creta', price: 3800, status: 'ACTIVE' },
    { routeId: 'route-njp-darjeeling', vehicleId: 'veh-innova', price: 4500, status: 'ACTIVE' },
  ];

  for (const p of pricings) {
    await db.collection('pricing').add({
      ...p,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
  }

  // 5. Drivers
  console.log('Seeding drivers...');
  const drivers = [
    {
      id: 'driver-1',
      name: 'Raju Subba',
      phone: '+91 9876543211',
      licenseNumber: 'SK01 20180004567',
      status: 'ACTIVE',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    {
      id: 'driver-2',
      name: 'Pema Tamang',
      phone: '+91 9876543212',
      licenseNumber: 'WB74 20190001234',
      status: 'ACTIVE',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    }
  ];

  for (const d of drivers) {
    const { id, ...data } = d;
    await db.collection('drivers').doc(id).set(data);
  }

  console.log('Seed complete!');
  process.exit(0);
}

seedData().catch(console.error);
