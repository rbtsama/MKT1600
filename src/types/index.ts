/**
 * 基础资产接口定义
 */
export interface BaseAsset {
  /** 资产使用次数 */
  usageCount: number;
  /** 最近使用时间（几天前） */
  lastUsed: number;
  /** 最近处罚时间（几天前），null表示无处罚 */
  lastPenalty: number | null;
  /** 删帖处罚次数 */
  deletionCount: number;
  /** 封号处罚次数 */
  banCount: number;
}

/**
 * 账户资产接口
 */
export interface AccountAsset extends BaseAsset {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 账号状态：正常或封号 */
  status: 'normal' | 'banned';
  /** 账号等级：青铜、白银、黄金 */
  level: 'bronze' | 'silver' | 'gold';
}

/**
 * 虚拟号资产接口
 */
export interface VirtualNumberAsset extends BaseAsset {
  /** 虚拟号码 */
  number: string;
  /** 虚拟号状态：正常或删除 */
  status: 'normal' | 'deleted';
}

/**
 * 车辆资产接口
 */
export interface VehicleAsset extends BaseAsset {
  /** 车辆VIN码 */
  vin: string;
  /** 车辆品牌和型号 */
  brand: string;
  /** 车辆配置详情 */
  detail: string;
  /** 车辆状态 */
  status: 'Ready_For_Sale' | 'Fixed' | 'SOLD';
}

/**
 * IP资产接口
 */
export interface IPAsset extends BaseAsset {
  /** IP地址 */
  address: string;
  /** IP所在地 */
  location: string;
  /** IP供应商 */
  provider: string;
}

/**
 * 处罚原因类型
 */
export type PenaltyReason = 'friendly' | 'ip' | 'title' | null;

/**
 * 资产历史记录接口
 */
export interface AssetHistory {
  /** 记录时间 */
  time: string;
  /** 主题标题 */
  title: string;
  /** 主题链接 */
  link: string;
  /** 动作类型 */
  action: 'posting' | 'pending' | 'manual_deletion' | 'deletion_penalty' | 'ban_penalty';
  /** 处罚原因 */
  reasons: PenaltyReason[];
  /** 关联账户 */
  account: string;
  /** 关联虚拟号 */
  virtualNumber: string;
  /** 关联车辆 */
  vehicle: string;
  /** 关联IP */
  ip: string;
} 