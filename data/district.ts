export interface NepalDistrict {
  value: string;
  label: string;
  province: string;
}

export interface NepalProvince {
  value: string;
  label: string;
}

/**
 * The 7 provinces of Nepal. `value` matches the `province` field on
 * each NepalDistrict entry below, so it can be used to filter districts.
 */
export const nepalProvinces: NepalProvince[] = [
  { value: "Koshi", label: "Koshi" },
  { value: "Madhesh", label: "Madhesh" },
  { value: "Bagmati", label: "Bagmati" },
  { value: "Gandaki", label: "Gandaki" },
  { value: "Lumbini", label: "Lumbini" },
  { value: "Karnali", label: "Karnali" },
  { value: "Sudurpashchim", label: "Sudurpashchim" },
];

/**
 * All 77 districts of Nepal, grouped by their province.
 * `value` is a slugified key (used for form state / Firestore),
 * `label` is the display name shown in the UI.
 */
export const nepalDistricts: NepalDistrict[] = [
  // Province 1 (Koshi)
  { value: "bhojpur", label: "Bhojpur", province: "Koshi" },
  { value: "dhankuta", label: "Dhankuta", province: "Koshi" },
  { value: "ilam", label: "Ilam", province: "Koshi" },
  { value: "jhapa", label: "Jhapa", province: "Koshi" },
  { value: "khotang", label: "Khotang", province: "Koshi" },
  { value: "morang", label: "Morang", province: "Koshi" },
  { value: "okhaldhunga", label: "Okhaldhunga", province: "Koshi" },
  { value: "panchthar", label: "Panchthar", province: "Koshi" },
  { value: "sankhuwasabha", label: "Sankhuwasabha", province: "Koshi" },
  { value: "solukhumbu", label: "Solukhumbu", province: "Koshi" },
  { value: "sunsari", label: "Sunsari", province: "Koshi" },
  { value: "taplejung", label: "Taplejung", province: "Koshi" },
  { value: "terhathum", label: "Terhathum", province: "Koshi" },
  { value: "udayapur", label: "Udayapur", province: "Koshi" },

  // Province 2 (Madhesh)
  { value: "bara", label: "Bara", province: "Madhesh" },
  { value: "dhanusha", label: "Dhanusha", province: "Madhesh" },
  { value: "mahottari", label: "Mahottari", province: "Madhesh" },
  { value: "parsa", label: "Parsa", province: "Madhesh" },
  { value: "rautahat", label: "Rautahat", province: "Madhesh" },
  { value: "saptari", label: "Saptari", province: "Madhesh" },
  { value: "sarlahi", label: "Sarlahi", province: "Madhesh" },
  { value: "siraha", label: "Siraha", province: "Madhesh" },

  // Bagmati
  { value: "bhaktapur", label: "Bhaktapur", province: "Bagmati" },
  { value: "chitwan", label: "Chitwan", province: "Bagmati" },
  { value: "dhading", label: "Dhading", province: "Bagmati" },
  { value: "dolakha", label: "Dolakha", province: "Bagmati" },
  { value: "kathmandu", label: "Kathmandu", province: "Bagmati" },
  { value: "kavrepalanchok", label: "Kavrepalanchok", province: "Bagmati" },
  { value: "lalitpur", label: "Lalitpur", province: "Bagmati" },
  { value: "makwanpur", label: "Makwanpur", province: "Bagmati" },
  { value: "nuwakot", label: "Nuwakot", province: "Bagmati" },
  { value: "ramechhap", label: "Ramechhap", province: "Bagmati" },
  { value: "rasuwa", label: "Rasuwa", province: "Bagmati" },
  { value: "sindhuli", label: "Sindhuli", province: "Bagmati" },
  { value: "sindhupalchok", label: "Sindhupalchok", province: "Bagmati" },

  // Gandaki
  { value: "baglung", label: "Baglung", province: "Gandaki" },
  { value: "gorkha", label: "Gorkha", province: "Gandaki" },
  { value: "kaski", label: "Kaski", province: "Gandaki" },
  { value: "lamjung", label: "Lamjung", province: "Gandaki" },
  { value: "manang", label: "Manang", province: "Gandaki" },
  { value: "mustang", label: "Mustang", province: "Gandaki" },
  { value: "myagdi", label: "Myagdi", province: "Gandaki" },
  { value: "nawalpur", label: "Nawalpur", province: "Gandaki" },
  { value: "parbat", label: "Parbat", province: "Gandaki" },
  { value: "syangja", label: "Syangja", province: "Gandaki" },
  { value: "tanahun", label: "Tanahun", province: "Gandaki" },

  // Lumbini
  { value: "arghakhanchi", label: "Arghakhanchi", province: "Lumbini" },
  { value: "banke", label: "Banke", province: "Lumbini" },
  { value: "bardiya", label: "Bardiya", province: "Lumbini" },
  { value: "dang", label: "Dang", province: "Lumbini" },
  { value: "eastern-rukum", label: "Eastern Rukum", province: "Lumbini" },
  { value: "gulmi", label: "Gulmi", province: "Lumbini" },
  { value: "kapilvastu", label: "Kapilvastu", province: "Lumbini" },
  { value: "parasi", label: "Parasi", province: "Lumbini" },
  { value: "palpa", label: "Palpa", province: "Lumbini" },
  { value: "pyuthan", label: "Pyuthan", province: "Lumbini" },
  { value: "rolpa", label: "Rolpa", province: "Lumbini" },
  { value: "rupandehi", label: "Rupandehi", province: "Lumbini" },

  // Karnali
  { value: "dailekh", label: "Dailekh", province: "Karnali" },
  { value: "dolpa", label: "Dolpa", province: "Karnali" },
  { value: "humla", label: "Humla", province: "Karnali" },
  { value: "jajarkot", label: "Jajarkot", province: "Karnali" },
  { value: "jumla", label: "Jumla", province: "Karnali" },
  { value: "kalikot", label: "Kalikot", province: "Karnali" },
  { value: "mugu", label: "Mugu", province: "Karnali" },
  { value: "salyan", label: "Salyan", province: "Karnali" },
  { value: "surkhet", label: "Surkhet", province: "Karnali" },
  { value: "western-rukum", label: "Western Rukum", province: "Karnali" },

  // Sudurpashchim
  { value: "achham", label: "Achham", province: "Sudurpashchim" },
  { value: "baitadi", label: "Baitadi", province: "Sudurpashchim" },
  { value: "bajhang", label: "Bajhang", province: "Sudurpashchim" },
  { value: "bajura", label: "Bajura", province: "Sudurpashchim" },
  { value: "dadeldhura", label: "Dadeldhura", province: "Sudurpashchim" },
  { value: "darchula", label: "Darchula", province: "Sudurpashchim" },
  { value: "doti", label: "Doti", province: "Sudurpashchim" },
  { value: "kailali", label: "Kailali", province: "Sudurpashchim" },
  { value: "kanchanpur", label: "Kanchanpur", province: "Sudurpashchim" },
];

/** Returns districts for a given province, or all districts if none is given. */
export function getDistrictsByProvince(province?: string): NepalDistrict[] {
  if (!province) return nepalDistricts;
  return nepalDistricts.filter((district) => district.province === province);
}