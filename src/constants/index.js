import {
  facebook,
  instagram,
  shieldTick,
  support,
  truckFast,
  twitter,
} from "../assets/icons";
import {
  bigShoe1,
  bigShoe2,
  bigShoe3,
  customer1,
  customer2,
  JD,
  jameson,
  redLabel,
  blackLabel,
  thumbnailShoe1,
  thumbnailShoe2,
  thumbnailShoe3,
} from "../assets/images";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about-us", label: "About Us" },
  { href: "#products", label: "Products" },
  { href: "#contact-us", label: "Contact Us" },
];

export const shoes = [
  { id: 1, thumbnail: thumbnailShoe1, bigShoe: bigShoe1 },
  { id: 2, thumbnail: thumbnailShoe2, bigShoe: bigShoe2 },
  { id: 3, thumbnail: thumbnailShoe3, bigShoe: bigShoe3 },
];

export const statistics = [
  { value: "300+", label: "Brands" },
  { value: "20k+", label: "Engagements" },
  { value: "2k+", label: "Customers" },
];

export const products = [
  {
    id: 1,
    imgURL: JD,
    name: "Classic Whiskey Blend 1 Litre",
    price: 4600,
  },
  {
    id: 2,
    imgURL: jameson,
    name: "Smooth Irish Blend 1 Litre",
    price: 3200,
  },
  {
    id: 3,
    imgURL: redLabel,
    name: "Premium Red Whisky 750ml",
    price: 2400,
  },
  {
    id: 4,
    imgURL: blackLabel,
    name: "Elite Black Whisky 1 Litre",
    price: 4500,
  },
  { id: 5, imgURL: JD, name: "Distilled Bourbon 1 Litre", price: 4600 },
  {
    id: 6,
    imgURL: jameson,
    name: "Signature Irish Whiskey 1 Litre",
    price: 3200,
  },
  {
    id: 7,
    imgURL: redLabel,
    name: "Classic Red Label 750ml",
    price: 2400,
  },
  {
    id: 8,
    imgURL: blackLabel,
    name: "Black Gold Whisky 1 Litre",
    price: 4500,
  },
  {
    id: 9,
    imgURL: blackLabel,
    name: "Rich Black Label 1 Litre",
    price: 4500,
  },
  { id: 10, imgURL: JD, name: "Bourbon Legacy 1 Litre", price: 4600 },
  {
    id: 11,
    imgURL: jameson,
    name: "Celtic Spirit Whiskey 1 Litre",
    price: 3200,
  },
  { id: 12, imgURL: redLabel, name: "Savory Red 750ml", price: 2400 },
  {
    id: 13,
    imgURL: blackLabel,
    name: "Black Premium Whisky 1 Litre",
    price: 4500,
  },
  {
    id: 14,
    imgURL: blackLabel,
    name: "Exclusive Black Whisky 1 Litre",
    price: 4500,
  },
  { id: 15, imgURL: JD, name: "Timeless Bourbon 1 Litre", price: 4600 },
  {
    id: 16,
    imgURL: jameson,
    name: "Heritage Irish Whiskey 1 Litre",
    price: 3200,
  },
  {
    id: 17,
    imgURL: redLabel,
    name: "Heritage Red Label 750ml",
    price: 2400,
  },
  {
    id: 18,
    imgURL: blackLabel,
    name: "Classic Black Label 1 Litre",
    price: 4500,
  },
  { id: 19, imgURL: redLabel, name: "Legacy Red 750ml", price: 2400 },
  {
    id: 20,
    imgURL: blackLabel,
    name: "Distinguished Black Whisky 1 Litre",
    price: 4500,
  },
  {
    id: 21,
    imgURL: blackLabel,
    name: "Elite Black Label 1 Litre",
    price: 4500,
  },
  { id: 22, imgURL: JD, name: "Prestige Bourbon 1 Litre", price: 4600 },
  {
    id: 23,
    imgURL: jameson,
    name: "Irish Legacy Whiskey 1 Litre",
    price: 3200,
  },
  {
    id: 24,
    imgURL: redLabel,
    name: "Classic Red Blend 750ml",
    price: 2400,
  },
  {
    id: 25,
    imgURL: blackLabel,
    name: "Ultimate Black Label Whisky 1 Litre",
    price: 4500,
  },
];

export const reviews = [
  {
    imgURL: customer1,
    customerName: "Morich Brown",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "Lota Mongeskar",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
  {
    imgURL: customer1,
    customerName: "Oriel Brown",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "Walter Mongera",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
  {
    imgURL: customer1,
    customerName: "Wee wacha bana",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "yoow bettr",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
  {
    imgURL: customer1,
    customerName: "Test !",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "User 1",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
];

export const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Air Force 1", link: "/" },
      { name: "Air Max 1", link: "/" },
      { name: "Air Jordan 1", link: "/" },
      { name: "Air Force 2", link: "/" },
      { name: "Nike Waffle Racer", link: "/" },
      { name: "Nike Cortez", link: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How it works", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "customer@nike.com", link: "mailto:customer@nike.com" },
      { name: "+92554862354", link: "tel:+92554862354" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];
export const recommendedProducts = [
  {
    id: 1,
    name: "Chips & Dips",
    price: 150,
    imgURL: JD,
  },
  {
    id: 2,
    name: "Cheese Platter",
    price: 500,
    imgURL: redLabel,
  },
  {
    id: 3,
    name: "Cocktail Shaker Set",
    price: 1200,
    imgURL: jameson,
  },
  {
    id: 4,
    name: "Wine Glass Set",
    price: 800,
    imgURL: blackLabel,
  },
  {
    id: 5,
    name: "Barbecue Grill",
    price: 3000,
    imgURL: JD,
  },
  {
    id: 6,
    name: "Ice Bucket",
    price: 600,
    imgURL: redLabel,
  },
  {
    id: 7,
    name: "Mixed Nuts",
    price: 350,
    imgURL: jameson,
  },
  {
    id: 8,
    name: "Soft Drinks",
    price: 100,
    imgURL: blackLabel,
  },
];
