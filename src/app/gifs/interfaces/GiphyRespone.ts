export interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}

export interface Downsized {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Downsized_large {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Downsized_medium {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Downsized_small {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
}

export interface Downsized_still {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Fixed_height {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

export interface Fixed_height_downsampled {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
}

export interface Fixed_height_small {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

export interface Fixed_height_small_still {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Fixed_height_still {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Fixed_width {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

export interface Fixed_width_downsampled {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
}

export interface Fixed_width_small {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

export interface Fixed_width_small_still {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Fixed_width_still {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Looping {
  mp4_size: string;
  mp4: string;
}

export interface Original_still {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Original_mp4 {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
}

export interface Preview {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
}

export interface Preview_gif {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Preview_webp {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface w_still {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Images {
  original: Original;
  downsized: Downsized;
  downsized_large: Downsized_large;
  downsized_medium: Downsized_medium;
  downsized_small: Downsized_small;
  downsized_still: Downsized_still;
  fixed_height: Fixed_height;
  fixed_height_downsampled: Fixed_height_downsampled;
  fixed_height_small: Fixed_height_small;
  fixed_height_small_still: Fixed_height_small_still;
  fixed_height_still: Fixed_height_still;
  fixed_width: Fixed_width;
  fixed_width_downsampled: Fixed_width_downsampled;
  fixed_width_small: Fixed_width_small;
  fixed_width_small_still: Fixed_width_small_still;
  fixed_width_still: Fixed_width_still;
  looping: Looping;
  original_still: Original_still;
  original_mp4: Original_mp4;
  preview: Preview;
  preview_gif: Preview_gif;
  preview_webp: Preview_webp;
  w_still: w_still;
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface Onload {
  url: string;
}

export interface Onclick {
  url: string;
}

export interface Onsent {
  url: string;
}

export interface Analytics {
  onload: Onload;
  onclick: Onclick;
  onsent: Onsent;
}

export interface Data {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
  analytics_response_payload: string;
  analytics: Analytics;
  alt_text: string;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface GiphyRespone {
  data: Data[];
  meta: Meta;
  pagination: Pagination;
}
