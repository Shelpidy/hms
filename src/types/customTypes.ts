

declare type formDataType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  profileImage?: string;
  contactNumber: string;
  gender: 'male' | 'female' | 'other' | null;
  dateOfBirth?: Date | null;
  address?: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin' | null;
  };




declare type UserProfile = {
  userId: string;
  profilePicture: string;
  displayName: string;
};

type BlogEditor = {
  userId: string;
  profilePicture: string;
  displayName: string;
};

declare type Blog = {
  blogId: string;
  title: string;
  url: string;
  content: string;
  tags: string[];
  imageUrl: string;
  createdAt: Date | string;
  createdBy: UserProfile;
  lastUpdatedAt: Date | string;
  editors: BlogEditor[];
  likesCount: number;
  commentsCount: number;
  sharesCount?: number;
  likedByMe: boolean;
  status: string;
};

declare type BlogList = Blog[];

declare type CarouselItem = {
  imageUrl: string;
  title1?: string;
  title2?: string;
};

declare type Product = {
  id: number|string;
  ownerId: number;
  imageURLs: string[];
  name: string;
  category: string;
  price: string;
  initialPrice: string | null;
  rating: number | null;
  description: string | null;
  numberAvailable: string | null;
  sizes: string[] | null;
};

declare interface ContactFormObject {
  fullname?: string;
  email?: string;
  subject?: string;
  message?: string;
}

declare interface Action {
  type: string;
  payload:any;
}

declare interface EmailVerifyResp {
  status?: string;
  content?: NonNullable<{
    message_id: NonNullable<string>;
    verified?: boolean;
  }>;
}

declare type ProductImage = {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
};


