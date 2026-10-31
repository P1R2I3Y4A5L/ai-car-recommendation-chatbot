import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Vroomy seed...');

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. TATA NEXON – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const nexonPetrol = await prisma.car.upsert({
    where: { slug: 'tata-nexon-petrol-2024' },
    update: {},
    create: {
      slug: 'tata-nexon-petrol-2024',
      name: 'Tata Nexon Petrol',
      brand: 'Tata',
      model: 'Nexon',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 8.0,
      priceMax: 15.0,
      priceUnit: 'lakh',
      description:
        'The Tata Nexon Petrol is one of India\'s safest compact SUVs, boasting a 5-star Global NCAP rating. It offers a peppy 1.2L turbo-petrol engine, modern design, and a feature-packed cabin — making it a top choice in the highly competitive sub-compact SUV segment.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 110,
          torqueNm: 170,
          cylinderCount: 3,
          mileageKmpl: 17.4,
          fuelTankLitres: 44,
          seatingCapacity: 5,
          bootLitres: 350,
          lengthMm: 3993,
          widthMm: 1811,
          heightMm: 1606,
          wheelbaseMm: 2498,
          groundClearanceMm: 208,
          topSpeedKmph: 180,
          zeroToHundredSec: 10.5,
          ncapRating: 5,
          ncapSource: 'Global NCAP',
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.tatamotors.com/cars/nexon/',
        },
      },
      variants: {
        create: [
          { name: 'Smart', priceMin: 8.0, priceMax: 8.0, isBaseVariant: true },
          { name: 'Pure', priceMin: 9.0, priceMax: 9.5 },
          { name: 'Creative', priceMin: 10.5, priceMax: 11.5 },
          { name: 'Fearless', priceMin: 12.5, priceMax: 13.5 },
          { name: 'Fearless S', priceMin: 14.0, priceMax: 15.0 },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control (ESC)', standard: false, optional: true },
          { category: 'safety', name: 'Hill Hold Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Sensors', standard: true },
          { category: 'safety', name: 'Rear Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Ventilated Front Seats', standard: false, optional: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: '10.25-inch Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'infotainment', name: 'Arkamys Sound System', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'Auto-Dimming IRVM', standard: false, optional: true },
          { category: 'exterior', name: 'LED DRLs & Projector Headlamps', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Tata Nexon Petrol upserted:', nexonPetrol.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. TATA NEXON – DIESEL
  // ─────────────────────────────────────────────────────────────────────────────
  const nexonDiesel = await prisma.car.upsert({
    where: { slug: 'tata-nexon-diesel-2024' },
    update: {},
    create: {
      slug: 'tata-nexon-diesel-2024',
      name: 'Tata Nexon Diesel',
      brand: 'Tata',
      model: 'Nexon',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'diesel',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 9.0,
      priceMax: 16.0,
      priceUnit: 'lakh',
      description:
        'The Tata Nexon Diesel combines the safety pedigree of the 5-star NCAP platform with a frugal 1.5L diesel engine, delivering an impressive 24 kmpl. Ideal for highway commuters and fuel-economy seekers in India\'s compact SUV segment.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 115,
          torqueNm: 260,
          cylinderCount: 4,
          mileageKmpl: 24.0,
          fuelTankLitres: 44,
          seatingCapacity: 5,
          bootLitres: 350,
          lengthMm: 3993,
          widthMm: 1811,
          heightMm: 1606,
          wheelbaseMm: 2498,
          groundClearanceMm: 208,
          topSpeedKmph: 185,
          zeroToHundredSec: 9.9,
          ncapRating: 5,
          ncapSource: 'Global NCAP',
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.tatamotors.com/cars/nexon/',
        },
      },
      variants: {
        create: [
          { name: 'Smart', priceMin: 9.0, priceMax: 9.5, isBaseVariant: true },
          { name: 'Pure', priceMin: 10.5, priceMax: 11.0 },
          { name: 'Creative', priceMin: 12.0, priceMax: 13.0 },
          { name: 'Fearless', priceMin: 14.0, priceMax: 15.0 },
          { name: 'Fearless S', priceMin: 15.5, priceMax: 16.0 },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control (ESC)', standard: false, optional: true },
          { category: 'safety', name: 'Hill Hold Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: '10.25-inch Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'exterior', name: 'LED DRLs & Projector Headlamps', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Tata Nexon Diesel upserted:', nexonDiesel.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. TATA NEXON EV
  // ─────────────────────────────────────────────────────────────────────────────
  const nexonEv = await prisma.car.upsert({
    where: { slug: 'tata-nexon-ev-2024' },
    update: {},
    create: {
      slug: 'tata-nexon-ev-2024',
      name: 'Tata Nexon EV',
      brand: 'Tata',
      model: 'Nexon EV',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'electric',
      transmission: 'automatic',
      market: 'india',
      currency: 'INR',
      priceMin: 14.5,
      priceMax: 19.0,
      priceUnit: 'lakh',
      description:
        'The Tata Nexon EV is India\'s best-selling electric SUV, offering up to 465 km ARAI-certified range on a 30.2 kWh battery. With fast-charging support, connected car tech, and a proven platform, it remains the benchmark for affordable EVs in India.',
      isDemo: true,
      specs: {
        create: {
          powerBhp: 127,
          torqueNm: 245,
          electricRangeKm: 465,
          batteryKwh: 30.2,
          seatingCapacity: 5,
          bootLitres: 350,
          lengthMm: 3993,
          widthMm: 1811,
          heightMm: 1606,
          wheelbaseMm: 2498,
          groundClearanceMm: 208,
          topSpeedKmph: 150,
          zeroToHundredSec: 8.9,
          ncapRating: 5,
          ncapSource: 'Global NCAP',
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.tatamotors.com/cars/nexon-ev/',
        },
      },
      variants: {
        create: [
          { name: 'Medium Range Creative', priceMin: 14.5, priceMax: 15.5, isBaseVariant: true },
          { name: 'Long Range Fearless', priceMin: 16.5, priceMax: 17.5 },
          { name: 'Long Range Fearless S', priceMin: 18.0, priceMax: 19.0 },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control (ESC)', standard: true },
          { category: 'safety', name: 'Hill Hold & Descent Control', standard: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Ventilated Front Seats', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: true },
          { category: 'infotainment', name: '10.25-inch Touchscreen (Zconnect)', standard: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: true },
          { category: 'infotainment', name: 'Over-the-Air (OTA) Updates', standard: true },
          { category: 'convenience', name: 'DC Fast Charging (50 kW)', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: true },
          { category: 'exterior', name: 'LED DRLs & Projector Headlamps', standard: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Tata Nexon EV upserted:', nexonEv.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. HYUNDAI CRETA – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const cretaPetrol = await prisma.car.upsert({
    where: { slug: 'hyundai-creta-petrol-2024' },
    update: {},
    create: {
      slug: 'hyundai-creta-petrol-2024',
      name: 'Hyundai Creta Petrol',
      brand: 'Hyundai',
      model: 'Creta',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 11.0,
      priceMax: 20.0,
      priceUnit: 'lakh',
      description:
        'The Hyundai Creta is one of India\'s most popular mid-size SUVs, completely redesigned for 2024. It comes with a bold new exterior, a dual-screen dashboard, advanced ADAS safety features, and a 1.5L naturally-aspirated petrol engine.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 115,
          torqueNm: 144,
          cylinderCount: 4,
          mileageKmpl: 17.4,
          fuelTankLitres: 50,
          seatingCapacity: 5,
          bootLitres: 433,
          lengthMm: 4310,
          widthMm: 1790,
          heightMm: 1635,
          wheelbaseMm: 2610,
          groundClearanceMm: 190,
          topSpeedKmph: 175,
          zeroToHundredSec: 10.8,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.hyundai.com/in/en/find-a-car/creta',
        },
      },
      variants: {
        create: [
          { name: 'E', priceMin: 11.0, priceMax: 11.5, isBaseVariant: true },
          { name: 'EX', priceMin: 13.0, priceMax: 13.5 },
          { name: 'S', priceMin: 14.0, priceMax: 15.5 },
          { name: 'SX', priceMin: 17.0, priceMax: 18.5, transmission: 'automatic' },
          { name: 'SX(O)', priceMin: 19.0, priceMax: 20.0, transmission: 'automatic' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ADAS Level 2 (Lane Keep, Forward Collision Warning)', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: false, optional: true },
          { category: 'safety', name: '360° Surround View Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Ventilated Front Seats', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: 'Dual 10.25-inch Screens (Instrument + Infotainment)', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'infotainment', name: 'Bose 8-Speaker Sound System', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'BlueLink Connected Car Tech', standard: false, optional: true },
          { category: 'exterior', name: 'LED DRLs & Connected LED Tail Lamps', standard: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Hyundai Creta Petrol upserted:', cretaPetrol.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. HYUNDAI CRETA – DIESEL
  // ─────────────────────────────────────────────────────────────────────────────
  const cretaDiesel = await prisma.car.upsert({
    where: { slug: 'hyundai-creta-diesel-2024' },
    update: {},
    create: {
      slug: 'hyundai-creta-diesel-2024',
      name: 'Hyundai Creta Diesel',
      brand: 'Hyundai',
      model: 'Creta',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'diesel',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 13.0,
      priceMax: 20.0,
      priceUnit: 'lakh',
      description:
        'The Hyundai Creta Diesel is the fuel-efficient variant of Hyundai\'s flagship mid-size SUV, returning 21.8 kmpl with a torquey 1.5L CRDi diesel engine. Perfect for long highway runs while packing premium features from the 2024 redesign.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 115,
          torqueNm: 250,
          cylinderCount: 4,
          mileageKmpl: 21.8,
          fuelTankLitres: 50,
          seatingCapacity: 5,
          bootLitres: 433,
          lengthMm: 4310,
          widthMm: 1790,
          heightMm: 1635,
          wheelbaseMm: 2610,
          groundClearanceMm: 190,
          topSpeedKmph: 180,
          zeroToHundredSec: 9.9,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.hyundai.com/in/en/find-a-car/creta',
        },
      },
      variants: {
        create: [
          { name: 'S', priceMin: 13.0, priceMax: 14.0, isBaseVariant: true },
          { name: 'S+', priceMin: 15.0, priceMax: 16.0 },
          { name: 'SX', priceMin: 17.5, priceMax: 18.5, transmission: 'automatic' },
          { name: 'SX(O)', priceMin: 19.5, priceMax: 20.0, transmission: 'automatic' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ADAS Level 2', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Ventilated Front Seats', standard: false, optional: true },
          { category: 'infotainment', name: 'Dual 10.25-inch Screens', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'convenience', name: 'BlueLink Connected Car Tech', standard: false, optional: true },
          { category: 'exterior', name: 'LED DRLs & Connected LED Tail Lamps', standard: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Hyundai Creta Diesel upserted:', cretaDiesel.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. MARUTI SUZUKI SWIFT – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const swiftPetrol = await prisma.car.upsert({
    where: { slug: 'maruti-swift-petrol-2024' },
    update: {},
    create: {
      slug: 'maruti-swift-petrol-2024',
      name: 'Maruti Suzuki Swift Petrol',
      brand: 'Maruti Suzuki',
      model: 'Swift',
      year: 2024,
      bodyType: 'hatchback',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 6.5,
      priceMax: 9.5,
      priceUnit: 'lakh',
      description:
        'The all-new fourth-generation Maruti Suzuki Swift (2024) is lighter, more fuel-efficient (24.8 kmpl), and sportier than its predecessor. Powered by a new Z-Series 1.2L engine and riding on an improved platform, it remains India\'s favourite urban hatchback.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 81.58,
          torqueNm: 112,
          cylinderCount: 3,
          mileageKmpl: 24.8,
          fuelTankLitres: 37,
          seatingCapacity: 5,
          bootLitres: 268,
          lengthMm: 3860,
          widthMm: 1735,
          heightMm: 1520,
          wheelbaseMm: 2450,
          groundClearanceMm: 163,
          topSpeedKmph: 160,
          zeroToHundredSec: 11.5,
          warrantyYears: 2,
          warrantyKm: 40000,
          sourceUrl: 'https://www.marutisuzuki.com/cars/swift',
        },
      },
      variants: {
        create: [
          { name: 'LXi', priceMin: 6.5, priceMax: 6.5, isBaseVariant: true },
          { name: 'VXi', priceMin: 7.25, priceMax: 7.5 },
          { name: 'ZXi', priceMin: 8.3, priceMax: 8.5 },
          { name: 'ZXi+', priceMin: 9.0, priceMax: 9.5, transmission: 'automatic' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Program', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Sensors', standard: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: '9-inch SmartPlay Pro+ Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'infotainment', name: 'Arkamys Sound System', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'Suzuki Connect (Connected Car)', standard: false, optional: true },
          { category: 'exterior', name: 'LED Headlamps with LED DRLs', standard: false, optional: true },
          { category: 'exterior', name: 'Alloy Wheels (15-inch)', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Maruti Suzuki Swift Petrol upserted:', swiftPetrol.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. MARUTI SUZUKI SWIFT – CNG
  // ─────────────────────────────────────────────────────────────────────────────
  const swiftCng = await prisma.car.upsert({
    where: { slug: 'maruti-swift-cng-2024' },
    update: {},
    create: {
      slug: 'maruti-swift-cng-2024',
      name: 'Maruti Suzuki Swift CNG',
      brand: 'Maruti Suzuki',
      model: 'Swift',
      year: 2024,
      bodyType: 'hatchback',
      fuelType: 'cng',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 8.0,
      priceMax: 10.0,
      priceUnit: 'lakh',
      description:
        'The Maruti Suzuki Swift CNG (S-CNG) is the factory-fitted compressed natural gas version of India\'s most popular hatchback. With an impressive 30.9 km/kg efficiency, it\'s the most economical version to run for high-mileage city commuters.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 70,
          torqueNm: 98.5,
          cylinderCount: 3,
          mileageKmpl: 30.9, // km/kg
          seatingCapacity: 5,
          bootLitres: 210, // reduced due to CNG cylinder
          lengthMm: 3860,
          widthMm: 1735,
          heightMm: 1520,
          wheelbaseMm: 2450,
          groundClearanceMm: 163,
          warrantyYears: 2,
          warrantyKm: 40000,
          sourceUrl: 'https://www.marutisuzuki.com/cars/swift',
        },
      },
      variants: {
        create: [
          { name: 'VXi CNG', priceMin: 8.0, priceMax: 8.5, isBaseVariant: true },
          { name: 'ZXi CNG', priceMin: 9.0, priceMax: 9.5 },
          { name: 'ZXi+ CNG', priceMin: 9.5, priceMax: 10.0 },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Rear Parking Sensors', standard: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: '9-inch SmartPlay Pro+ Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'convenience', name: 'S-CNG Factory Fitted Kit', standard: true },
          { category: 'convenience', name: 'Dual Interconnected CNG Cylinders', standard: true },
          { category: 'exterior', name: 'LED Headlamps with LED DRLs', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Maruti Suzuki Swift CNG upserted:', swiftCng.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. HONDA CITY – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const hondaCity = await prisma.car.upsert({
    where: { slug: 'honda-city-petrol-2024' },
    update: {},
    create: {
      slug: 'honda-city-petrol-2024',
      name: 'Honda City Petrol',
      brand: 'Honda',
      model: 'City',
      year: 2024,
      bodyType: 'sedan',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 11.5,
      priceMax: 16.0,
      priceUnit: 'lakh',
      description:
        'The Honda City remains India\'s quintessential premium sedan, celebrated for its spacious cabin, refined 1.5L i-VTEC engine, and Honda Sensing ADAS suite. The 5th-generation City continues to set the benchmark for comfort and reliability in the mid-size sedan segment.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 121,
          torqueNm: 145,
          cylinderCount: 4,
          mileageKmpl: 17.4,
          fuelTankLitres: 40,
          seatingCapacity: 5,
          bootLitres: 506,
          lengthMm: 4553,
          widthMm: 1748,
          heightMm: 1489,
          wheelbaseMm: 2600,
          groundClearanceMm: 165,
          topSpeedKmph: 195,
          zeroToHundredSec: 9.5,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.hondacarindia.com/city',
        },
      },
      variants: {
        create: [
          { name: 'V', priceMin: 11.5, priceMax: 12.0, isBaseVariant: true },
          { name: 'VX', priceMin: 13.0, priceMax: 13.5 },
          { name: 'ZX', priceMin: 14.5, priceMax: 15.0, transmission: 'automatic' },
          { name: 'ZX CVT', priceMin: 15.5, priceMax: 16.0, transmission: 'cvt' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'Honda Sensing ADAS (CMBS, LKAS, ACC)', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Camera with Guidelines', standard: false, optional: true },
          { category: 'comfort', name: 'Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control with Rear AC Vents', standard: true },
          { category: 'comfort', name: 'Heated Rear Glass', standard: true },
          { category: 'infotainment', name: '8-inch Honda Connect Touchscreen', standard: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: true },
          { category: 'infotainment', name: '7-inch Digital Instrument Cluster', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'Remote Engine Start', standard: false, optional: true },
          { category: 'exterior', name: 'LED Headlamps & LED Tail Lamps', standard: true },
          { category: 'exterior', name: '16-inch Alloy Wheels', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Honda City Petrol upserted:', hondaCity.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. MAHINDRA SCORPIO-N – DIESEL
  // ─────────────────────────────────────────────────────────────────────────────
  const scorpioN = await prisma.car.upsert({
    where: { slug: 'mahindra-scorpio-n-diesel-2024' },
    update: {},
    create: {
      slug: 'mahindra-scorpio-n-diesel-2024',
      name: 'Mahindra Scorpio-N Diesel',
      brand: 'Mahindra',
      model: 'Scorpio-N',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'diesel',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 13.5,
      priceMax: 24.0,
      priceUnit: 'lakh',
      description:
        'The Mahindra Scorpio-N is a full-size body-on-frame SUV that redefined the segment with its 5-star Global NCAP safety rating, powerful mHawk diesel engine options, and rugged all-wheel drive capability. Available in 6-seat and 7-seat configurations.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 175,
          torqueNm: 400,
          cylinderCount: 4,
          mileageKmpl: 15.8,
          fuelTankLitres: 57,
          seatingCapacity: 7,
          bootLitres: 189, // 3rd row folded
          lengthMm: 4662,
          widthMm: 1917,
          heightMm: 1857,
          wheelbaseMm: 2750,
          groundClearanceMm: 200,
          topSpeedKmph: 175,
          zeroToHundredSec: 9.8,
          ncapRating: 5,
          ncapSource: 'Global NCAP',
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://auto.mahindra.com/suv/scorpio-n',
        },
      },
      variants: {
        create: [
          { name: 'Z2', priceMin: 13.5, priceMax: 14.0, isBaseVariant: true },
          { name: 'Z4', priceMin: 15.5, priceMax: 16.5 },
          { name: 'Z6', priceMin: 18.5, priceMax: 19.5 },
          { name: 'Z8', priceMin: 21.0, priceMax: 22.0, transmission: 'automatic' },
          { name: 'Z8 L', priceMin: 23.0, priceMax: 24.0, transmission: 'automatic' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: true },
          { category: 'safety', name: 'Hill Hold & Descent Control', standard: false, optional: true },
          { category: 'safety', name: '360° Camera (4-Camera System)', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Sensors', standard: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Dual-Zone Auto Climate Control', standard: false, optional: true },
          { category: 'comfort', name: 'Ventilated Front Seats', standard: false, optional: true },
          { category: 'infotainment', name: '8-inch Sony Touchscreen with ARKAMYS', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'infotainment', name: 'AdrenoX Connected Car Suite', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: '4WD with Low-Range Transfer Case', standard: false, optional: true },
          { category: 'exterior', name: 'LED Projector Headlamps', standard: false, optional: true },
          { category: 'exterior', name: '18-inch Diamond-Cut Alloy Wheels', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Mahindra Scorpio-N Diesel upserted:', scorpioN.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. MARUTI SUZUKI ERTIGA – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const ertiga = await prisma.car.upsert({
    where: { slug: 'maruti-ertiga-petrol-2024' },
    update: {},
    create: {
      slug: 'maruti-ertiga-petrol-2024',
      name: 'Maruti Suzuki Ertiga Petrol',
      brand: 'Maruti Suzuki',
      model: 'Ertiga',
      year: 2024,
      bodyType: 'mpv',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 8.5,
      priceMax: 13.5,
      priceUnit: 'lakh',
      description:
        'The Maruti Suzuki Ertiga is India\'s best-selling 7-seater MPV, prized for its roomy three-row cabin, excellent fuel efficiency of 20.3 kmpl, and low maintenance costs. The 2024 model continues to reign as the practical family car of choice for Indian households.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 103,
          torqueNm: 138,
          cylinderCount: 4,
          mileageKmpl: 20.3,
          fuelTankLitres: 45,
          seatingCapacity: 7,
          bootLitres: 135, // 3rd row up
          lengthMm: 4395,
          widthMm: 1735,
          heightMm: 1690,
          wheelbaseMm: 2740,
          groundClearanceMm: 185,
          topSpeedKmph: 165,
          zeroToHundredSec: 12.5,
          warrantyYears: 2,
          warrantyKm: 40000,
          sourceUrl: 'https://www.marutisuzuki.com/cars/ertiga',
        },
      },
      variants: {
        create: [
          { name: 'LXi', priceMin: 8.5, priceMax: 8.5, isBaseVariant: true },
          { name: 'VXi', priceMin: 9.5, priceMax: 10.0 },
          { name: 'ZXi', priceMin: 11.0, priceMax: 11.5 },
          { name: 'ZXi+', priceMin: 12.5, priceMax: 13.5, transmission: 'automatic' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '2 Airbags', standard: true },
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control with Rear AC', standard: false, optional: true },
          { category: 'comfort', name: 'Captain Seats (2nd Row)', standard: false, optional: true },
          { category: 'infotainment', name: '7-inch SmartPlay Studio Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry', standard: false, optional: true },
          { category: 'convenience', name: 'Third Row One-Touch Tumble', standard: true },
          { category: 'exterior', name: 'LED Tail Lamps', standard: true },
          { category: 'exterior', name: '15-inch Alloy Wheels', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Maruti Suzuki Ertiga Petrol upserted:', ertiga.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 11. TOYOTA INNOVA CRYSTA – DIESEL
  // ─────────────────────────────────────────────────────────────────────────────
  const innovaCrysta = await prisma.car.upsert({
    where: { slug: 'toyota-innova-crysta-diesel-2024' },
    update: {},
    create: {
      slug: 'toyota-innova-crysta-diesel-2024',
      name: 'Toyota Innova Crysta Diesel',
      brand: 'Toyota',
      model: 'Innova Crysta',
      year: 2024,
      bodyType: 'mpv',
      fuelType: 'diesel',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 19.5,
      priceMax: 26.5,
      priceUnit: 'lakh',
      description:
        'The Toyota Innova Crysta is India\'s most trusted premium MPV, built on a body-on-frame ladder chassis for exceptional durability. Its 2.4L diesel engine, spacious 7/8-seat configurations, and Toyota\'s legendary reliability make it the definitive people-carrier for Indian roads.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 148,
          torqueNm: 360,
          cylinderCount: 4,
          mileageKmpl: 15.1,
          fuelTankLitres: 55,
          seatingCapacity: 8,
          bootLitres: 210,
          lengthMm: 4735,
          widthMm: 1830,
          heightMm: 1795,
          wheelbaseMm: 2750,
          groundClearanceMm: 178,
          topSpeedKmph: 175,
          zeroToHundredSec: 10.5,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.toyotabharat.com/cars/innova-crysta/',
        },
      },
      variants: {
        create: [
          { name: 'GX 7-Seater', priceMin: 19.5, priceMax: 20.5, isBaseVariant: true },
          { name: 'VX 7-Seater', priceMin: 22.0, priceMax: 23.0 },
          { name: 'ZX 7-Seater', priceMin: 24.5, priceMax: 25.5, transmission: 'automatic' },
          { name: 'ZX(O) 7-Seater', priceMin: 25.5, priceMax: 26.5, transmission: 'automatic' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '7 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Vehicle Stability Control', standard: false, optional: true },
          { category: 'safety', name: 'Hill-Start Assist Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Camera', standard: true },
          { category: 'comfort', name: 'Dual-Zone Automatic AC with Rear Vents', standard: true },
          { category: 'comfort', name: 'Captain Seats (2nd Row)', standard: false, optional: true },
          { category: 'comfort', name: 'Ottoman Seat (2nd Row)', standard: false, optional: true },
          { category: 'infotainment', name: '9-inch Touchscreen with Wired Android Auto & CarPlay', standard: true },
          { category: 'infotainment', name: '11-inch Rear Entertainment Screen', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'Power Sliding Door', standard: false, optional: true },
          { category: 'exterior', name: 'LED Projector Headlamps with LED DRLs', standard: false, optional: true },
          { category: 'exterior', name: '17-inch Alloy Wheels', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Toyota Innova Crysta Diesel upserted:', innovaCrysta.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 12. HYUNDAI i20 – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const i20Petrol = await prisma.car.upsert({
    where: { slug: 'hyundai-i20-petrol-2024' },
    update: {},
    create: {
      slug: 'hyundai-i20-petrol-2024',
      name: 'Hyundai i20 Petrol',
      brand: 'Hyundai',
      model: 'i20',
      year: 2024,
      bodyType: 'hatchback',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 7.0,
      priceMax: 13.0,
      priceUnit: 'lakh',
      description:
        'The Hyundai i20 is a premium hatchback that punches above its segment, offering a European-inspired design, a feature-rich cabin with a sunroof, and available 1.0L turbo-petrol and 1.2L naturally-aspirated petrol engines. Its bold styling and tech-forward approach keep it competitive.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 83,
          torqueNm: 115,
          cylinderCount: 4,
          mileageKmpl: 20.35,
          fuelTankLitres: 37,
          seatingCapacity: 5,
          bootLitres: 311,
          lengthMm: 3995,
          widthMm: 1775,
          heightMm: 1505,
          wheelbaseMm: 2580,
          groundClearanceMm: 165,
          topSpeedKmph: 170,
          zeroToHundredSec: 11.5,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.hyundai.com/in/en/find-a-car/i20',
        },
      },
      variants: {
        create: [
          { name: 'E', priceMin: 7.0, priceMax: 7.5, isBaseVariant: true },
          { name: 'S', priceMin: 8.5, priceMax: 9.5 },
          { name: 'S Turbo', priceMin: 10.0, priceMax: 11.0,  } as any,
          { name: 'SX', priceMin: 11.0, priceMax: 11.5 },
          { name: 'SX(O) Turbo', priceMin: 12.0, priceMax: 13.0, transmission: 'dct' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: '10.25-inch Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'infotainment', name: 'Bose 7-Speaker Sound System', standard: false, optional: true },
          { category: 'infotainment', name: '10.25-inch Digital Instrument Cluster', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'BlueLink Connected Car', standard: false, optional: true },
          { category: 'exterior', name: 'LED Headlamps & LED DRLs', standard: false, optional: true },
          { category: 'exterior', name: '16-inch Diamond-Cut Alloy Wheels', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Hyundai i20 Petrol upserted:', i20Petrol.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 13. TATA PUNCH – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const punchPetrol = await prisma.car.upsert({
    where: { slug: 'tata-punch-petrol-2024' },
    update: {},
    create: {
      slug: 'tata-punch-petrol-2024',
      name: 'Tata Punch Petrol',
      brand: 'Tata',
      model: 'Punch',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 6.0,
      priceMax: 10.0,
      priceUnit: 'lakh',
      description:
        'The Tata Punch is a micro-SUV that redefined the entry-level segment with its 5-star Global NCAP safety rating — the highest for any car in its class. It blends SUV styling with hatchback practicality, a 1.2L Revotron petrol engine, and multiple drive modes.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 86,
          torqueNm: 113,
          cylinderCount: 3,
          mileageKmpl: 18.97,
          fuelTankLitres: 37,
          seatingCapacity: 5,
          bootLitres: 366,
          lengthMm: 3827,
          widthMm: 1742,
          heightMm: 1615,
          wheelbaseMm: 2445,
          groundClearanceMm: 187,
          topSpeedKmph: 148,
          zeroToHundredSec: 12.0,
          ncapRating: 5,
          ncapSource: 'Global NCAP',
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.tatamotors.com/cars/punch/',
        },
      },
      variants: {
        create: [
          { name: 'Pure', priceMin: 6.0, priceMax: 6.5, isBaseVariant: true },
          { name: 'Adventure', priceMin: 7.0, priceMax: 7.5 },
          { name: 'Accomplished', priceMin: 8.0, priceMax: 8.5 },
          { name: 'Creative', priceMin: 9.0, priceMax: 10.0, transmission: 'amt' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '4 Airbags', standard: true },
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: false, optional: true },
          { category: 'safety', name: 'Rear Parking Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'comfort', name: 'Multi-Drive Modes (Eco, City, Sport)', standard: false, optional: true },
          { category: 'infotainment', name: '7-inch Harman Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'iRA Connected Car Technology', standard: false, optional: true },
          { category: 'exterior', name: 'Bi-Projector LED Headlamps', standard: false, optional: true },
          { category: 'exterior', name: 'Roof Rails', standard: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Tata Punch Petrol upserted:', punchPetrol.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 14. TATA PUNCH EV
  // ─────────────────────────────────────────────────────────────────────────────
  const punchEv = await prisma.car.upsert({
    where: { slug: 'tata-punch-ev-2024' },
    update: {},
    create: {
      slug: 'tata-punch-ev-2024',
      name: 'Tata Punch EV',
      brand: 'Tata',
      model: 'Punch EV',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'electric',
      transmission: 'automatic',
      market: 'india',
      currency: 'INR',
      priceMin: 10.99,
      priceMax: 15.49,
      priceUnit: 'lakh',
      description:
        'The Tata Punch EV is India\'s most affordable mass-market electric SUV, launched in early 2024. Built on Tata\'s acti.ev platform, it offers up to 421 km of ARAI-certified range, DC fast charging, and a technology-forward cabin — democratising EV ownership in the subcontinent.',
      isDemo: true,
      specs: {
        create: {
          powerBhp: 82,
          torqueNm: 114,
          electricRangeKm: 421,
          batteryKwh: 25,
          seatingCapacity: 5,
          bootLitres: 366,
          lengthMm: 3827,
          widthMm: 1742,
          heightMm: 1615,
          wheelbaseMm: 2445,
          groundClearanceMm: 190,
          topSpeedKmph: 140,
          zeroToHundredSec: 9.5,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.tatamotors.com/cars/punch-ev/',
        },
      },
      variants: {
        create: [
          { name: 'Smart', priceMin: 10.99, priceMax: 11.5, isBaseVariant: true },
          { name: 'Smart+', priceMin: 12.0, priceMax: 12.5 },
          { name: 'Adventure', priceMin: 12.5, priceMax: 13.5 },
          { name: 'Empowered', priceMin: 14.5, priceMax: 15.49 },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '4 Airbags', standard: true },
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: true },
          { category: 'safety', name: 'Rear Parking Camera', standard: false, optional: true },
          { category: 'comfort', name: 'Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: '10.25-inch Touchscreen', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'infotainment', name: 'Over-the-Air (OTA) Updates', standard: true },
          { category: 'convenience', name: 'DC Fast Charging (25 kW)', standard: false, optional: true },
          { category: 'convenience', name: 'Vehicle-to-Load (V2L) Technology', standard: false, optional: true },
          { category: 'convenience', name: 'iRA Connected Car Technology', standard: true },
          { category: 'exterior', name: 'Bi-Projector LED Headlamps', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Tata Punch EV upserted:', punchEv.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 15. KIA SELTOS – PETROL
  // ─────────────────────────────────────────────────────────────────────────────
  const seltosPetrol = await prisma.car.upsert({
    where: { slug: 'kia-seltos-petrol-2024' },
    update: {},
    create: {
      slug: 'kia-seltos-petrol-2024',
      name: 'Kia Seltos Petrol',
      brand: 'Kia',
      model: 'Seltos',
      year: 2024,
      bodyType: 'suv',
      fuelType: 'petrol',
      transmission: 'manual',
      market: 'india',
      currency: 'INR',
      priceMin: 11.0,
      priceMax: 21.0,
      priceUnit: 'lakh',
      description:
        'The Kia Seltos is a feature-packed mid-size SUV that challenged the segment status quo with its bold design, segment-first ADAS features, and Kia\'s Global Ace Dual-screen infotainment system. Available with 1.5L NA petrol and 1.5L Turbo-GDi engines.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 115,
          torqueNm: 144,
          cylinderCount: 4,
          mileageKmpl: 16.5,
          fuelTankLitres: 50,
          seatingCapacity: 5,
          bootLitres: 433,
          lengthMm: 4365,
          widthMm: 1800,
          heightMm: 1645,
          wheelbaseMm: 2610,
          groundClearanceMm: 190,
          topSpeedKmph: 175,
          zeroToHundredSec: 10.7,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.kia.com/in/cars/seltos.html',
        },
      },
      variants: {
        create: [
          { name: 'EX', priceMin: 11.0, priceMax: 12.0, isBaseVariant: true },
          { name: 'HTX', priceMin: 14.0, priceMax: 15.0 },
          { name: 'HTX+', priceMin: 17.0, priceMax: 18.0, transmission: 'automatic' },
          { name: 'GTX+', priceMin: 19.5, priceMax: 21.0, transmission: 'dct' },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '6 Airbags', standard: false, optional: true },
          { category: 'safety', name: 'ADAS Level 2 (10+ Features)', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: false, optional: true },
          { category: 'safety', name: '360° Surround View Monitor', standard: false, optional: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Ventilated & Heated Front Seats', standard: false, optional: true },
          { category: 'comfort', name: 'Dual-Zone Auto Climate Control', standard: false, optional: true },
          { category: 'infotainment', name: 'Global Ace Dual 10.25-inch Screens', standard: false, optional: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: false, optional: true },
          { category: 'infotainment', name: 'Meridian 8-Speaker Sound System', standard: false, optional: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: false, optional: true },
          { category: 'convenience', name: 'Kia Connect (OTA, Remote Functions)', standard: false, optional: true },
          { category: 'exterior', name: 'Star Map LED Headlamps', standard: false, optional: true },
          { category: 'exterior', name: '18-inch Diamond-Cut Alloy Wheels', standard: false, optional: true },
        ],
      },
      markets: {
        create: [{ country: 'IN', available: true }],
      },
    },
  });
  console.log('✅ Kia Seltos Petrol upserted:', seltosPetrol.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 16. TOYOTA CAMRY HYBRID (GLOBAL / INDIA)
  // ─────────────────────────────────────────────────────────────────────────────
  const camryHybrid = await prisma.car.upsert({
    where: { slug: 'toyota-camry-hybrid-2024' },
    update: {},
    create: {
      slug: 'toyota-camry-hybrid-2024',
      name: 'Toyota Camry Hybrid',
      brand: 'Toyota',
      model: 'Camry',
      year: 2024,
      bodyType: 'sedan',
      fuelType: 'hybrid',
      transmission: 'cvt',
      market: 'india',
      currency: 'INR',
      priceMin: 48.0,
      priceMax: 48.0,
      priceUnit: 'lakh',
      description:
        'The Toyota Camry Hybrid is the only full self-charging hybrid executive sedan sold in India. The 9th-generation model brings a complete redesign with a sleeker profile, a new 225V hybrid system producing a combined 218 bhp, and Toyota\'s Safety Sense 3.0 ADAS suite as standard.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 218,
          torqueNm: 221,
          cylinderCount: 4,
          mileageKmpl: 21.78,
          seatingCapacity: 5,
          bootLitres: 493,
          lengthMm: 4920,
          widthMm: 1840,
          heightMm: 1445,
          wheelbaseMm: 2825,
          groundClearanceMm: 145,
          topSpeedKmph: 180,
          zeroToHundredSec: 8.3,
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.toyotabharat.com/cars/camry/',
        },
      },
      variants: {
        create: [
          { name: 'Hybrid (Single Trim)', priceMin: 48.0, priceMax: 48.0, isBaseVariant: true },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '9 Airbags', standard: true },
          { category: 'safety', name: 'Toyota Safety Sense 3.0 ADAS', standard: true },
          { category: 'safety', name: 'Electronic Stability Control', standard: true },
          { category: 'safety', name: '360° Panoramic View Monitor', standard: true },
          { category: 'safety', name: 'Blind Spot Monitor', standard: true },
          { category: 'comfort', name: 'Panoramic Sunroof', standard: true },
          { category: 'comfort', name: 'Ventilated & Heated Front Seats', standard: true },
          { category: 'comfort', name: 'Dual-Zone Auto Climate Control', standard: true },
          { category: 'comfort', name: 'Heated Steering Wheel', standard: true },
          { category: 'infotainment', name: '12.3-inch Touchscreen', standard: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: true },
          { category: 'infotainment', name: 'JBL 9-Speaker Sound System', standard: true },
          { category: 'infotainment', name: '12.3-inch Digital Instrument Cluster', standard: true },
          { category: 'convenience', name: 'Keyless Entry & Push Button Start', standard: true },
          { category: 'convenience', name: 'Wireless Charging Pad', standard: true },
          { category: 'exterior', name: 'LED Headlamps with Auto High-Beam', standard: true },
          { category: 'exterior', name: '18-inch Alloy Wheels', standard: true },
        ],
      },
      markets: {
        create: [
          { country: 'IN', available: true },
          { country: 'GLOBAL', available: true },
        ],
      },
    },
  });
  console.log('✅ Toyota Camry Hybrid upserted:', camryHybrid.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 17. TESLA MODEL 3 (GLOBAL / USD)
  // ─────────────────────────────────────────────────────────────────────────────
  const teslaModel3 = await prisma.car.upsert({
    where: { slug: 'tesla-model-3-electric-2024' },
    update: {},
    create: {
      slug: 'tesla-model-3-electric-2024',
      name: 'Tesla Model 3',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2024,
      bodyType: 'sedan',
      fuelType: 'electric',
      transmission: 'automatic',
      market: 'global',
      currency: 'USD',
      priceMin: 40.0,
      priceMax: 55.0,
      priceUnit: 'thousand',
      description:
        'The refreshed Tesla Model 3 "Highland" (2024) brings a completely updated interior with ambient lighting and an 8-inch rear touchscreen, while retaining the segment-leading range of up to 498 miles. Available in Rear-Wheel Drive, Long Range, and Performance variants.',
      isDemo: true,
      specs: {
        create: {
          powerBhp: 283,
          torqueNm: 375,
          electricRangeKm: 498,
          batteryKwh: 75,
          seatingCapacity: 5,
          bootLitres: 594, // front + rear
          lengthMm: 4720,
          widthMm: 1849,
          heightMm: 1443,
          wheelbaseMm: 2875,
          groundClearanceMm: 140,
          topSpeedKmph: 225,
          zeroToHundredSec: 6.1,
          warrantyYears: 4,
          warrantyKm: 80000,
          sourceUrl: 'https://www.tesla.com/model3',
        },
      },
      variants: {
        create: [
          { name: 'Rear-Wheel Drive', priceMin: 40.0, priceMax: 42.0, isBaseVariant: true },
          { name: 'Long Range AWD', priceMin: 47.0, priceMax: 49.0 },
          { name: 'Performance AWD', priceMin: 53.0, priceMax: 55.0 },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '8 Airbags', standard: true },
          { category: 'safety', name: 'Tesla Autopilot (ADAS)', standard: true },
          { category: 'safety', name: 'Full Self-Driving Capability', standard: false, optional: true },
          { category: 'safety', name: 'Collision Avoidance Assist', standard: true },
          { category: 'safety', name: 'Blind Spot Warning', standard: true },
          { category: 'safety', name: '360° Camera System', standard: true },
          { category: 'comfort', name: 'Glass Roof (Full-Length)', standard: true },
          { category: 'comfort', name: 'Heated Front & Rear Seats', standard: true },
          { category: 'comfort', name: 'Vegan Leather Seats', standard: true },
          { category: 'infotainment', name: '15.4-inch Central Touchscreen', standard: true },
          { category: 'infotainment', name: '8-inch Rear Passenger Touchscreen', standard: true },
          { category: 'infotainment', name: 'Premium Audio (17 Speakers)', standard: true },
          { category: 'infotainment', name: 'Over-the-Air (OTA) Updates', standard: true },
          { category: 'convenience', name: 'Supercharger Network Access (AC & DC)', standard: true },
          { category: 'convenience', name: 'Keyless Entry via Phone/Card', standard: true },
          { category: 'convenience', name: 'Tesla App Remote Control', standard: true },
          { category: 'exterior', name: 'Flush Door Handles', standard: true },
          { category: 'exterior', name: '18-inch Aero Wheels', standard: true },
        ],
      },
      markets: {
        create: [
          { country: 'US', available: true },
          { country: 'EU', available: true },
          { country: 'CN', available: true },
          { country: 'GLOBAL', available: true },
        ],
      },
    },
  });
  console.log('✅ Tesla Model 3 upserted:', teslaModel3.id);

  // ─────────────────────────────────────────────────────────────────────────────
  // 18. BMW 3 SERIES – PETROL (INDIA / GLOBAL)
  // ─────────────────────────────────────────────────────────────────────────────
  const bmw3Series = await prisma.car.upsert({
    where: { slug: 'bmw-3-series-petrol-2024' },
    update: {},
    create: {
      slug: 'bmw-3-series-petrol-2024',
      name: 'BMW 3 Series Petrol',
      brand: 'BMW',
      model: '3 Series',
      year: 2024,
      bodyType: 'sedan',
      fuelType: 'petrol',
      transmission: 'automatic',
      market: 'india',
      currency: 'INR',
      priceMin: 46.0,
      priceMax: 63.0,
      priceUnit: 'lakh',
      description:
        'The BMW 3 Series remains the archetypal sports sedan, combining rear-wheel drive dynamics, a turbocharged 2.0L four-cylinder engine, and BMW\'s Curved Display iDrive system. The LCI (Life Cycle Impulse) facelift brings updated headlamps, a revised grille, and enhanced driving assistance systems.',
      isDemo: true,
      specs: {
        create: {
          
          powerBhp: 252,
          torqueNm: 400,
          cylinderCount: 4,
          mileageKmpl: 14.6,
          fuelTankLitres: 59,
          seatingCapacity: 5,
          bootLitres: 480,
          lengthMm: 4709,
          widthMm: 1827,
          heightMm: 1435,
          wheelbaseMm: 2851,
          groundClearanceMm: 137,
          topSpeedKmph: 250, // electronically limited
          zeroToHundredSec: 5.8,
          ncapRating: 5,
          ncapSource: 'Euro NCAP',
          warrantyYears: 3,
          warrantyKm: 100000,
          sourceUrl: 'https://www.bmw.in/en/all-models/3-series/sedan/2023/bmw-3-series-sedan.html',
        },
      },
      variants: {
        create: [
          { name: '320i Sport Line', priceMin: 46.0, priceMax: 49.0, isBaseVariant: true },
          { name: '320i M Sport', priceMin: 51.0, priceMax: 54.0 },
          { name: '330i M Sport', priceMin: 57.0, priceMax: 60.0 },
          { name: '330i Gran Limousine', priceMin: 61.0, priceMax: 63.0 },
        ],
      },
      features: {
        create: [
          { category: 'safety', name: '8 Airbags', standard: true },
          { category: 'safety', name: 'BMW Driving Assistance Professional (ADAS)', standard: false, optional: true },
          { category: 'safety', name: 'ABS with EBD & CBC', standard: true },
          { category: 'safety', name: 'Dynamic Stability Control (DSC)', standard: true },
          { category: 'safety', name: '3D View Camera System', standard: false, optional: true },
          { category: 'safety', name: 'Parking Assistant Plus', standard: false, optional: true },
          { category: 'comfort', name: 'Panoramic Glass Sunroof', standard: false, optional: true },
          { category: 'comfort', name: 'Heated & Massaging Front Seats', standard: false, optional: true },
          { category: 'comfort', name: 'Dual-Zone Auto Climate Control', standard: true },
          { category: 'comfort', name: 'M Sport Suspension', standard: false, optional: true },
          { category: 'infotainment', name: 'BMW Curved Display (12.3" + 14.9")', standard: true },
          { category: 'infotainment', name: 'Wireless Android Auto & Apple CarPlay', standard: true },
          { category: 'infotainment', name: 'Harman Kardon 16-Speaker System', standard: false, optional: true },
          { category: 'infotainment', name: 'BMW Live Cockpit Professional', standard: true },
          { category: 'convenience', name: 'Keyless Entry & Comfort Access', standard: true },
          { category: 'convenience', name: 'Wireless Charging Pad', standard: true },
          { category: 'convenience', name: 'BMW ConnectedDrive (OTA & Remote Services)', standard: true },
          { category: 'exterior', name: 'Adaptive LED Headlamps', standard: true },
          { category: 'exterior', name: '18-inch M Double-Spoke Alloy Wheels', standard: false, optional: true },
          { category: 'exterior', name: 'M Sport Body Kit', standard: false, optional: true },
        ],
      },
      markets: {
        create: [
          { country: 'IN', available: true },
          { country: 'EU', available: true },
          { country: 'US', available: true },
          { country: 'GLOBAL', available: true },
        ],
      },
    },
  });
  console.log('✅ BMW 3 Series Petrol upserted:', bmw3Series.id);

  console.log('\n🎉 Vroomy seed completed successfully!');
  console.log(`📊 Total cars seeded: 18`);
  console.log('   ├─ India Market: 15 cars');
  console.log('   └─ Global/International: 3 cars');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
