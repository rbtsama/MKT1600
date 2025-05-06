import { AccountAsset, VirtualNumberAsset, VehicleAsset, IPAsset, AssetHistory } from '../types';

/**
 * 账户资产模拟数据
 */
export const accountAssets: AccountAsset[] = [
  {
    username: 'WasingerB',
    password: 'password123',
    status: 'available',
    level: 'silver',
    usageCount: 2,
    lastUsed: 0,
    lastInactive: 5,
    lastPenalty: 0,
    deletionCount: 1,
    banCount: 0
  },
  {
    username: 'yycclife',
    password: 'securepass456',
    status: 'in_use',
    level: 'gold',
    usageCount: 12,
    lastUsed: 0,
    lastInactive: 8,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 0
  },
  {
    username: 'MichaelJ',
    password: 'mjpass789',
    status: 'available',
    level: 'bronze',
    usageCount: 5,
    lastUsed: 1,
    lastInactive: 3,
    lastPenalty: null,
    deletionCount: 0,
    banCount: 0
  },
  {
    username: 'CarterS',
    password: 'carter2023',
    status: 'disabled',
    level: 'silver',
    usageCount: 15,
    lastUsed: 7,
    lastInactive: 0,
    lastPenalty: 7,
    deletionCount: 3,
    banCount: 1
  },
  {
    username: 'JohnsonT',
    password: 'tjohnson123',
    status: 'in_use',
    level: 'gold',
    usageCount: 20,
    lastUsed: 2,
    lastInactive: 14,
    lastPenalty: 10,
    deletionCount: 1,
    banCount: 0
  },
  {
    username: 'SmithR',
    password: 'rsmith456',
    status: 'disabled',
    level: 'bronze',
    usageCount: 8,
    lastUsed: 5,
    lastInactive: 1,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 1
  },
  {
    username: 'BrownL',
    password: 'lbrown789',
    status: 'available',
    level: 'silver',
    usageCount: 10,
    lastUsed: 0,
    lastInactive: 9,
    lastPenalty: 8,
    deletionCount: 1,
    banCount: 0
  }
];

/**
 * 虚拟号资产模拟数据
 */
export const virtualNumberAssets: VirtualNumberAsset[] = [
  {
    number: '650-206-5471',
    status: 'available',
    usageCount: 2,
    lastUsed: 0,
    lastInactive: 4,
    lastPenalty: 0,
    deletionCount: 1,
    banCount: 0
  },
  {
    number: '951-501-2112',
    status: 'in_use',
    usageCount: 12,
    lastUsed: 0,
    lastInactive: 7,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 0
  },
  {
    number: '415-555-1234',
    status: 'available',
    usageCount: 7,
    lastUsed: 1,
    lastInactive: 2,
    lastPenalty: null,
    deletionCount: 0,
    banCount: 0
  },
  {
    number: '213-555-6789',
    status: 'disabled',
    usageCount: 15,
    lastUsed: 7,
    lastInactive: 0,
    lastPenalty: 7,
    deletionCount: 3,
    banCount: 1
  },
  {
    number: '408-555-4321',
    status: 'in_use',
    usageCount: 20,
    lastUsed: 2,
    lastInactive: 12,
    lastPenalty: 10,
    deletionCount: 1,
    banCount: 0
  },
  {
    number: '510-555-9876',
    status: 'disabled',
    usageCount: 8,
    lastUsed: 5,
    lastInactive: 1,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 1
  },
  {
    number: '619-555-7890',
    status: 'available',
    usageCount: 10,
    lastUsed: 0,
    lastInactive: 8,
    lastPenalty: 8,
    deletionCount: 1,
    banCount: 0
  }
];

/**
 * 车辆资产模拟数据
 */
export const vehicleAssets: VehicleAsset[] = [
  {
    vin: 'WDCOG4JB4GF107833',
    brand: '2016 MERCEDES-BENZ GLC-Class',
    detail: 'GLC 300 SUV 4D',
    prepStatus: 'Ready_For_Sale',
    status: 'available',
    usageCount: 2,
    lastUsed: 0,
    lastInactive: 3,
    lastPenalty: 0,
    deletionCount: 1,
    banCount: 0
  },
  {
    vin: '3VW217AU6HM025474',
    brand: '2017 VOLKSWAGEN Golf',
    detail: 'GTI SE HATCHBACK 4D',
    prepStatus: 'Retail_Photo',
    status: 'in_use',
    usageCount: 12,
    lastUsed: 0,
    lastInactive: 6,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 0
  },
  {
    vin: 'JH4CU2699C003479',
    brand: '2009 ACURA TSX',
    detail: 'BASE SEDAN 4D',
    prepStatus: 'SOLD',
    status: 'sold',
    usageCount: 15,
    lastUsed: 3,
    lastInactive: 1,
    lastPenalty: 3,
    deletionCount: 3,
    banCount: 0
  },
  {
    vin: '1HGCM82633A123456',
    brand: '2018 HONDA Accord',
    detail: 'TOURING SEDAN 4D',
    prepStatus: 'Inspection',
    status: 'available',
    usageCount: 7,
    lastUsed: 1,
    lastInactive: 5,
    lastPenalty: null,
    deletionCount: 0,
    banCount: 0
  },
  {
    vin: '5YJSA1E47MF123789',
    brand: '2021 TESLA Model 3',
    detail: 'PERFORMANCE SEDAN 4D',
    prepStatus: 'Ready_For_Sale',
    status: 'in_use',
    usageCount: 20,
    lastUsed: 2,
    lastInactive: 10,
    lastPenalty: 10,
    deletionCount: 1,
    banCount: 0
  },
  {
    vin: '1G1BE5SM2G7123456',
    brand: '2016 CHEVROLET Malibu',
    detail: 'LT SEDAN 4D',
    prepStatus: 'SOLD',
    status: 'sold',
    usageCount: 8,
    lastUsed: 5,
    lastInactive: 0,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 1
  },
  {
    vin: '4T1BF1FK5CU123456',
    brand: '2019 TOYOTA Camry',
    detail: 'XSE SEDAN 4D',
    prepStatus: 'Inspection',
    status: 'available',
    usageCount: 10,
    lastUsed: 0,
    lastInactive: 7,
    lastPenalty: 8,
    deletionCount: 1,
    banCount: 0
  }
];

/**
 * IP资产模拟数据
 */
export const ipAssets: IPAsset[] = [
  {
    address: '203.40.7.46',
    location: '洛杉矶',
    provider: 'CenturyLink',
    status: 'available',
    usageCount: 2,
    lastUsed: 0,
    lastInactive: 4,
    lastPenalty: 0,
    deletionCount: 1,
    banCount: 0
  },
  {
    address: '203.40.92.32',
    location: '洛杉矶',
    provider: 'CenturyLink',
    status: 'in_use',
    usageCount: 12,
    lastUsed: 0,
    lastInactive: 9,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 0
  },
  {
    address: '104.156.85.123',
    location: '芝加哥',
    provider: 'Comcast',
    status: 'in_use',
    usageCount: 7,
    lastUsed: 1,
    lastInactive: 11,
    lastPenalty: null,
    deletionCount: 0,
    banCount: 0
  },
  {
    address: '72.14.192.45',
    location: '纽约',
    provider: 'Verizon',
    status: 'disabled',
    usageCount: 15,
    lastUsed: 7,
    lastInactive: 2,
    lastPenalty: 7,
    deletionCount: 3,
    banCount: 1
  },
  {
    address: '98.137.11.164',
    location: '达拉斯',
    provider: 'AT&T',
    status: 'available',
    usageCount: 20,
    lastUsed: 2,
    lastInactive: 13,
    lastPenalty: 10,
    deletionCount: 1,
    banCount: 0
  },
  {
    address: '216.58.194.78',
    location: '旧金山',
    provider: 'Google Cloud',
    status: 'disabled',
    usageCount: 8,
    lastUsed: 5,
    lastInactive: 1,
    lastPenalty: 5,
    deletionCount: 2,
    banCount: 1
  },
  {
    address: '52.94.236.248',
    location: '西雅图',
    provider: 'Amazon AWS',
    status: 'available',
    usageCount: 10,
    lastUsed: 0,
    lastInactive: 6,
    lastPenalty: 8,
    deletionCount: 1,
    banCount: 0
  }
];

/**
 * 资产历史记录模拟数据
 */
export const assetHistories: AssetHistory[] = [
  {
    time: '2025-04-30 09:15 AM',
    title: '2016 Mercedes GLC300 低里程 完美车况',
    link: 'https://example.com/post/123456',
    action: 'posting',
    reasons: [],
    account: 'WasingerB',
    virtualNumber: '650-206-5471',
    vehicle: 'WDCOG4JB4GF107833',
    ip: '203.40.7.46'
  },
  {
    time: '2025-04-30 08:30 AM',
    title: '2017 VW Golf GTI SE 一手车主 无事故',
    link: 'https://example.com/post/123457',
    action: 'posting',
    reasons: [],
    account: 'yycclife',
    virtualNumber: '951-501-2112',
    vehicle: '3VW217AU6HM025474',
    ip: '203.40.92.32'
  },
  {
    time: '2025-04-30 07:45 AM',
    title: '2018 Honda Accord Touring 全景天窗',
    link: 'https://example.com/post/123458',
    action: 'posting',
    reasons: [],
    account: 'MichaelJ',
    virtualNumber: '415-555-1234',
    vehicle: '1HGCM82633A123456',
    ip: '104.156.85.123'
  },
  {
    time: '2025-04-29 10:20 PM',
    title: '2021 Tesla Model 3 Performance 低价出售',
    link: 'https://example.com/post/123459',
    action: 'posting',
    reasons: [],
    account: 'JohnsonT',
    virtualNumber: '408-555-4321',
    vehicle: '5YJSA1E47MF123789',
    ip: '98.137.11.164'
  },
  {
    time: '2025-04-29 03:15 PM',
    title: '2019 Toyota Camry XSE 无事故记录',
    link: 'https://example.com/post/123460',
    action: 'posting',
    reasons: [],
    account: 'BrownL',
    virtualNumber: '619-555-7890',
    vehicle: '4T1BF1FK5CU123456',
    ip: '52.94.236.248'
  },
  {
    time: '2025-04-29 09:30 AM',
    title: '2009 Acura TSX 价格优惠',
    link: 'https://example.com/post/123461',
    action: 'pending',
    reasons: [],
    account: 'MichaelJ',
    virtualNumber: '415-555-1234',
    vehicle: 'JH4CU2699C003479',
    ip: '104.156.85.123'
  },
  {
    time: '2025-04-28 02:45 PM',
    title: '2016 Mercedes GLC300 低里程',
    link: 'https://example.com/post/123462',
    action: 'deletion_penalty',
    reasons: ['title'],
    account: 'WasingerB',
    virtualNumber: '650-206-5471',
    vehicle: 'WDCOG4JB4GF107833',
    ip: '203.40.7.46'
  },
  {
    time: '2025-04-25 11:20 AM',
    title: '2017 VW Golf GTI SE 一手车主',
    link: 'https://example.com/post/123463',
    action: 'deletion_penalty',
    reasons: ['friendly', 'ip'],
    account: 'yycclife',
    virtualNumber: '951-501-2112',
    vehicle: '3VW217AU6HM025474',
    ip: '203.40.92.32'
  },
  {
    time: '2025-04-23 08:30 AM',
    title: '2016 Chevrolet Malibu LT 价格低',
    link: 'https://example.com/post/123464',
    action: 'ban_penalty',
    reasons: ['friendly', 'title'],
    account: 'SmithR',
    virtualNumber: '510-555-9876',
    vehicle: '1G1BE5SM2G7123456',
    ip: '216.58.194.78'
  },
  {
    time: '2025-04-23 07:15 AM',
    title: '2009 Acura TSX 无事故',
    link: 'https://example.com/post/123465',
    action: 'deletion_penalty',
    reasons: ['ip'],
    account: 'MichaelJ',
    virtualNumber: '415-555-1234',
    vehicle: 'JH4CU2699C003479',
    ip: '104.156.85.123'
  }
]; 