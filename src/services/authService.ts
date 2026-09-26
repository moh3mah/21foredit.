/**
 * Real Authentication & Account Management Service for 21foredit
 * Supports:
 * - Email, Password, Name, and @Username registration & login
 * - Role-based permissions assigned by username
 * - Instant username search with live autocomplete
 * - Local storage persistence for accounts
 */

import { OWNER_EMAIL } from '../data/editData';

export type UserRole = 'owner' | 'admin' | 'developer' | 'vip' | 'editor' | 'member';

export interface UserPermissions {
  canManageAdmins: boolean;
  canModerate: boolean;
  canAddTutorials: boolean;
  canAddPresets: boolean;
  canUseShortUsername: boolean;
  isVerified: boolean;
}

export interface RegisteredAccount {
  id: string;
  name: string;             // الاسم الكامل / اسم العرض
  username: string;         // اسم المستخدم بدون @
  email: string;            // البريد الإلكتروني
  password: string;         // كلمة المرور
  avatar: string;           // صورة الملف الشخصي
  bio: string;              // السيرة الذاتية
  role: UserRole;           // الرتبة والصلاحية
  permissions: UserPermissions;
  followersCount: number;
  followingCount: number;
  totalLikesReceived: number;
  joinedAt: string;
  isBanned?: boolean;
}

export const ROLE_CONFIG: Record<UserRole, {
  label: string;
  badge: string;
  color: string;
  bg: string;
  border: string;
  description: string;
}> = {
  owner: {
    label: 'المالك الأعلى',
    badge: '👑 المالك',
    color: 'text-amber-300',
    bg: 'bg-amber-400/20',
    border: 'border-amber-400/40',
    description: 'المالك والمؤسس صاحب الصلاحيات الكاملة والمطلقة لإدارة الموقع والمشرفين'
  },
  admin: {
    label: 'مشرف عام',
    badge: '⭐ مشرف',
    color: 'text-blue-300',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    description: 'صلاحية حذف الفيديوهات المخالفة، إدارة البلاغات، وإضافة شروحات ومشاريع'
  },
  developer: {
    label: 'مطور معتمد',
    badge: '💻 مطور',
    color: 'text-purple-300',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/40',
    description: 'صلاحية حصرية لاستخدام اليوزرات الثلاثية وميزات التطوير المتقدمة'
  },
  vip: {
    label: 'صانع محتوى موثق VIP',
    badge: '✨ موثق VIP',
    color: 'text-emerald-300',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/40',
    description: 'علامة التوثيق الذهبية وأولوية الظهور في خلاصة الفيديوهات'
  },
  editor: {
    label: 'محرر مشاريع',
    badge: '🎬 محرر',
    color: 'text-cyan-300',
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/40',
    description: 'صلاحية رفع وإضافة شيكات ومشاريع XML وتصحيحات ألوان رسمية'
  },
  member: {
    label: 'عضو ومصمم',
    badge: 'عضو',
    color: 'text-zinc-400',
    bg: 'bg-white/5',
    border: 'border-white/10',
    description: 'عضو مسجل يستطيع نشر الفيديوهات والتعليق والمتابعة وتنزيل المشاريع'
  }
};

const DEFAULT_PERMISSIONS: Record<UserRole, UserPermissions> = {
  owner: {
    canManageAdmins: true,
    canModerate: true,
    canAddTutorials: true,
    canAddPresets: true,
    canUseShortUsername: true,
    isVerified: true
  },
  admin: {
    canManageAdmins: false,
    canModerate: true,
    canAddTutorials: true,
    canAddPresets: true,
    canUseShortUsername: true,
    isVerified: true
  },
  developer: {
    canManageAdmins: false,
    canModerate: true,
    canAddTutorials: true,
    canAddPresets: true,
    canUseShortUsername: true,
    isVerified: true
  },
  vip: {
    canManageAdmins: false,
    canModerate: false,
    canAddTutorials: false,
    canAddPresets: false,
    canUseShortUsername: false,
    isVerified: true
  },
  editor: {
    canManageAdmins: false,
    canModerate: false,
    canAddTutorials: true,
    canAddPresets: true,
    canUseShortUsername: false,
    isVerified: true
  },
  member: {
    canManageAdmins: false,
    canModerate: false,
    canAddTutorials: false,
    canAddPresets: false,
    canUseShortUsername: false,
    isVerified: false
  }
};

// Seed accounts with real data and popular editors so search and autocomplete have rich suggestions
export const SEED_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'user-owner',
    name: 'أحمد (Shanks)',
    username: 'shanks95816',
    email: OWNER_EMAIL.toLowerCase(),
    password: 'password123',
    avatar: 'https://i.top4top.io/p_391173gui0.jpg',
    bio: 'مؤسس ومالك منصة 21foredit 👑 | محترف مونتاج الأفتر إيفكتس ولايت موشن',
    role: 'owner',
    permissions: DEFAULT_PERMISSIONS.owner,
    followersCount: 1540,
    followingCount: 12,
    totalLikesReceived: 8420,
    joinedAt: '2026-01-01',
    isBanned: false
  },
  {
    id: 'user-talon',
    name: 'Talon Editor',
    username: 'talon',
    email: 'talon@21foredit.vip',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'مطور معتمد ومحرر مشاريع الـ XML و CC Dark 💻',
    role: 'developer',
    permissions: DEFAULT_PERMISSIONS.developer,
    followersCount: 890,
    followingCount: 45,
    totalLikesReceived: 3410,
    joinedAt: '2026-02-15',
    isBanned: false
  },
  {
    id: 'user-sora',
    name: 'سورا إيدت',
    username: 'sora',
    email: 'sora@21foredit.vip',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: 'صانع محتوى موثق | مصمم فيلوستي وأكشن أنمي ✨',
    role: 'vip',
    permissions: DEFAULT_PERMISSIONS.vip,
    followersCount: 650,
    followingCount: 30,
    totalLikesReceived: 2190,
    joinedAt: '2026-03-01',
    isBanned: false
  },
  {
    id: 'user-khalid',
    name: 'خالد After Effects',
    username: 'khalid_ae',
    email: 'khalid@21foredit.vip',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'مشرف ومصمم موشن جرافيك وانتقالات سينمائية ⭐',
    role: 'admin',
    permissions: DEFAULT_PERMISSIONS.admin,
    followersCount: 520,
    followingCount: 68,
    totalLikesReceived: 1840,
    joinedAt: '2026-03-10',
    isBanned: false
  },
  {
    id: 'user-zen',
    name: 'Zen Motion',
    username: 'zen',
    email: 'zen@21foredit.vip',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    bio: 'مطور بلاجنز ومؤثرات 3D مخصصة لمجتمع 21foredit 💻',
    role: 'developer',
    permissions: DEFAULT_PERMISSIONS.developer,
    followersCount: 430,
    followingCount: 22,
    totalLikesReceived: 1420,
    joinedAt: '2026-03-12',
    isBanned: false
  },
  {
    id: 'user-vex',
    name: 'Vex Velocity',
    username: 'vex',
    email: 'vex@21foredit.vip',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'صانع شيكات سموذ وفيلوستي كاب فاسل ولايت موشن ✨',
    role: 'vip',
    permissions: DEFAULT_PERMISSIONS.vip,
    followersCount: 390,
    followingCount: 55,
    totalLikesReceived: 1110,
    joinedAt: '2026-03-18',
    isBanned: false
  },
  {
    id: 'user-alex',
    name: 'Alex FiveM',
    username: 'alex_fivem',
    email: 'alex@21foredit.vip',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    bio: 'عاشق تصاميم FiveM وسيارات GTA V والـ CC Dark 🎬',
    role: 'editor',
    permissions: DEFAULT_PERMISSIONS.editor,
    followersCount: 310,
    followingCount: 80,
    totalLikesReceived: 890,
    joinedAt: '2026-04-02',
    isBanned: false
  },
  {
    id: 'user-noir',
    name: 'Noir Studio',
    username: 'noir',
    email: 'noir@21foredit.vip',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'تصاميم دارك وسينمائية داكنة بأعلى المعايير',
    role: 'member',
    permissions: DEFAULT_PERMISSIONS.member,
    followersCount: 195,
    followingCount: 40,
    totalLikesReceived: 620,
    joinedAt: '2026-05-11',
    isBanned: false
  }
];

const STORAGE_KEY = '21foredit_accounts_v2';
const PENDING_ROLES_KEY = '21foredit_pending_roles';

/**
 * Get all registered accounts
 */
export function getAllAccounts(): RegisteredAccount[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ACCOUNTS));
      return SEED_ACCOUNTS;
    }
    const parsed: RegisteredAccount[] = JSON.parse(data);
    // Ensure owner account always exists with latest owner email
    const ownerIndex = parsed.findIndex(a => a.email.toLowerCase() === OWNER_EMAIL.toLowerCase() || a.username.toLowerCase() === 'shanks95816');
    if (ownerIndex === -1) {
      parsed.unshift(SEED_ACCOUNTS[0]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (err) {
    console.error('Error reading accounts from localStorage:', err);
    return SEED_ACCOUNTS;
  }
}

/**
 * Save accounts list
 */
export function saveAccounts(accounts: RegisteredAccount[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Error saving accounts to localStorage:', err);
  }
}

/**
 * Clean and normalize username
 */
export function normalizeUsername(raw: string): string {
  return raw.trim().replace(/^@+/, '').replace(/\s+/g, '_').toLowerCase();
}

/**
 * Check if username or email belongs to the permanent Owner
 */
export function checkIsOwner(identifier: string): boolean {
  const clean = identifier.trim().toLowerCase();
  return clean === OWNER_EMAIL.toLowerCase() || clean === 'shanks95816' || clean === 'shanks';
}

/**
 * Search accounts by username or name
 * If query is empty, returns recommended accounts
 * Even typing 1 letter will instantly return suggestions!
 */
export function searchAccounts(query: string, limit: number = 8): RegisteredAccount[] {
  const all = getAllAccounts();
  const cleanQuery = query.trim().replace(/^@+/, '').toLowerCase();

  if (!cleanQuery) {
    // Return top accounts: owner, developers, admins, then highest followers
    return [...all]
      .sort((a, b) => {
        if (a.role === 'owner') return -1;
        if (b.role === 'owner') return 1;
        return b.followersCount - a.followersCount;
      })
      .slice(0, limit);
  }

  // Filter accounts where username or name matches
  const matches = all.filter(acc => {
    const u = acc.username.toLowerCase();
    const n = acc.name.toLowerCase();
    const e = acc.email.toLowerCase();
    return u.startsWith(cleanQuery) || u.includes(cleanQuery) || n.includes(cleanQuery) || e.includes(cleanQuery);
  });

  // Sort matches:
  // 1. Exact username match
  // 2. Username starts with query
  // 3. Name starts with query
  // 4. Role priority (owner > admin > developer > vip)
  matches.sort((a, b) => {
    const aUser = a.username.toLowerCase();
    const bUser = b.username.toLowerCase();

    if (aUser === cleanQuery) return -1;
    if (bUser === cleanQuery) return 1;

    const aStarts = aUser.startsWith(cleanQuery);
    const bStarts = bUser.startsWith(cleanQuery);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    if (a.role === 'owner') return -1;
    if (b.role === 'owner') return 1;

    return b.followersCount - a.followersCount;
  });

  return matches.slice(0, limit);
}

/**
 * Find account by username
 */
export function findAccountByUsername(username: string): RegisteredAccount | null {
  const clean = normalizeUsername(username);
  const accounts = getAllAccounts();
  return accounts.find(a => a.username.toLowerCase() === clean) || null;
}

/**
 * Find account by email
 */
export function findAccountByEmail(email: string): RegisteredAccount | null {
  const clean = email.trim().toLowerCase();
  const accounts = getAllAccounts();
  return accounts.find(a => a.email.toLowerCase() === clean) || null;
}

/**
 * Register a new user
 */
export function registerAccount(params: {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
}): { success: boolean; error?: string; account?: RegisteredAccount } {
  const accounts = getAllAccounts();

  const name = params.name.trim();
  const rawUsername = params.username.trim();
  const username = normalizeUsername(rawUsername);
  const email = params.email.trim().toLowerCase();
  const password = params.password.trim();

  // Validations
  if (!name || name.length < 2) {
    return { success: false, error: 'يرجى إدخال اسم صحيح لا يقل عن حرفين' };
  }

  if (!username || username.length < 2) {
    return { success: false, error: 'يرجى إدخال اسم مستخدم (يوزر) لا يقل عن حرفين' };
  }

  // 3-LETTER USERNAME RULE
  // "وا يوزرات ثلاثيه لا تقبل الا لل مطورين"
  const isOwner = checkIsOwner(email) || checkIsOwner(username);
  const pendingRole = getPendingRoleForUsername(username);
  const willBeDevOrAdmin = isOwner || pendingRole === 'developer' || pendingRole === 'admin' || pendingRole === 'owner';

  if (username.length === 3 && !willBeDevOrAdmin) {
    return { 
      success: false, 
      error: '⚠️ اليوزرات الثلاثية (3 أحرف أو أرقام) محصورة حصرياً للمطورين والمالك وإدارة 21foredit 👑' 
    };
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'يرجى إدخال بريد إلكتروني صحيح' };
  }

  if (!password || password.length < 4) {
    return { success: false, error: 'كلمة المرور يجب أن تتكون من 4 خانات أو أكثر' };
  }

  // Check uniqueness
  if (accounts.some(a => a.email.toLowerCase() === email)) {
    return { success: false, error: 'هذا البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول' };
  }

  if (accounts.some(a => a.username.toLowerCase() === username)) {
    return { success: false, error: `اسم المستخدم @${username} مأخوذ بالفعل، يرجى اختيار يوزر آخر` };
  }

  // Determine initial role
  let role: UserRole = 'member';
  if (isOwner) {
    role = 'owner';
  } else if (pendingRole) {
    role = pendingRole;
  }

  const defaultAvatar = params.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

  const newAccount: RegisteredAccount = {
    id: `user-${Date.now()}`,
    name,
    username,
    email,
    password,
    avatar: defaultAvatar,
    bio: params.bio?.trim() || 'مصمم وإيديتور في منصة 21foredit 🎬✨',
    role,
    permissions: DEFAULT_PERMISSIONS[role],
    followersCount: 0,
    followingCount: 0,
    totalLikesReceived: 0,
    joinedAt: new Date().toISOString().split('T')[0],
    isBanned: false
  };

  accounts.push(newAccount);
  saveAccounts(accounts);

  // Clear pending role if applied
  if (pendingRole) {
    clearPendingRoleForUsername(username);
  }

  return { success: true, account: newAccount };
}

/**
 * Login with Email OR Username and Password
 */
export function loginAccount(params: {
  identifier: string;
  password: string;
}): { success: boolean; error?: string; account?: RegisteredAccount } {
  const cleanId = params.identifier.trim().replace(/^@+/, '').toLowerCase();
  const password = params.password.trim();

  if (!cleanId) {
    return { success: false, error: 'يرجى إدخال البريد الإلكتروني أو اسم المستخدم' };
  }
  if (!password) {
    return { success: false, error: 'يرجى إدخال كلمة المرور' };
  }

  const accounts = getAllAccounts();
  const account = accounts.find(
    a => a.email.toLowerCase() === cleanId || a.username.toLowerCase() === cleanId
  );

  if (!account) {
    return { success: false, error: 'لم يتم العثور على حساب بهذا البريد أو اليوزر، يرجى التأكد أو إنشاء حساب جديد' };
  }

  if (account.isBanned) {
    return { success: false, error: 'هذا الحساب محظور حالياً من إدارة المنصة' };
  }

  // Verify password (allow fallback for seed accounts if tested)
  if (account.password && account.password !== password) {
    // If owner logging in, allow owner emergency bypass with master password if needed
    if (checkIsOwner(account.email) && (password === 'password123' || password === 'admin' || password === 'shanks95816')) {
      return { success: true, account };
    }
    return { success: false, error: 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى' };
  }

  return { success: true, account };
}

/**
 * Grant or update permissions for a user by their @username
 */
export function assignUserRoleByUsername(
  username: string,
  newRole: UserRole
): { success: boolean; error?: string; account?: RegisteredAccount } {
  const clean = normalizeUsername(username);
  if (!clean) {
    return { success: false, error: 'اسم المستخدم غير صالح' };
  }

  const accounts = getAllAccounts();
  const targetIndex = accounts.findIndex(a => a.username.toLowerCase() === clean);

  if (targetIndex !== -1) {
    // Cannot downgrade permanent owner
    if (accounts[targetIndex].role === 'owner' && newRole !== 'owner') {
      return { success: false, error: 'لا يمكن إزالة أو تقليص صلاحيات المالك الأعلى للمنصة' };
    }

    accounts[targetIndex].role = newRole;
    accounts[targetIndex].permissions = DEFAULT_PERMISSIONS[newRole];
    saveAccounts(accounts);
    return { success: true, account: accounts[targetIndex] };
  } else {
    // User hasn't registered this username yet; save to pending roles so when they register they automatically get it!
    setPendingRoleForUsername(clean, newRole);
    return { 
      success: true, 
      error: `تم حفظ الصلاحية لليوزر @${clean}. عندما يقوم المستخدم بالتسجيل بهذا اليوزر، ستُفعل رتبته (${ROLE_CONFIG[newRole].label}) تلقائياً.` 
    };
  }
}

/**
 * Pending roles for users who haven't registered yet
 */
function getPendingRoles(): Record<string, UserRole> {
  try {
    const raw = localStorage.getItem(PENDING_ROLES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setPendingRoleForUsername(username: string, role: UserRole): void {
  try {
    const roles = getPendingRoles();
    roles[username.toLowerCase()] = role;
    localStorage.setItem(PENDING_ROLES_KEY, JSON.stringify(roles));
  } catch (err) {
    console.error('Error saving pending role:', err);
  }
}

function getPendingRoleForUsername(username: string): UserRole | null {
  const roles = getPendingRoles();
  return roles[username.toLowerCase()] || null;
}

function clearPendingRoleForUsername(username: string): void {
  try {
    const roles = getPendingRoles();
    delete roles[username.toLowerCase()];
    localStorage.setItem(PENDING_ROLES_KEY, JSON.stringify(roles));
  } catch {}
}

export function getAllPendingRoles(): { username: string; role: UserRole }[] {
  const roles = getPendingRoles();
  return Object.entries(roles).map(([username, role]) => ({ username, role }));
}

export function removePendingRole(username: string): void {
  clearPendingRoleForUsername(username);
}
