import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

let all_product = [
  {
    id: 1,
    name: "Royal Canin Feline Health Nutrition Kitten Wet Cat Food 85g (12 pouches)",
    category: "cat",
    image: p1_img,
    new_price: 960.00,
    old_price: 980.0,
  },
  {
    id: 2,
    name: "Royal Canin Feline Health Nutrition Kitten Sterilised 37 Dry Cat Food 2kg",
    category: "cat",
    image: p2_img,
    new_price: 1489.00,
    old_price: 1500.00,
  },
  {
    id: 3,
    name: "Royal Canin Feline Health Nutrition Senior Ageing 12+ Dry Cat Food 2kg",
    category: "cat",
    image: p3_img,
    new_price: 1500.00,
    old_price: 1600.0,
  },
  {
    id: 4,
    name: "Royal Canin Feline Health Nutrition Senior Instinctive Wet Cat Food 85g (12 pouches)",
    category: "cat",
    image: p4_img,
    new_price: 1020.00,
    old_price: 1600.00,
  },
  {
    id: 5,
    name: "Meow Mix Original Choice Dry Cat Food 1.43kg",
    category: "cat",
    image: p5_img,
    new_price: 379.75,
    old_price: 400.75,
  },
  {
    id: 6,
    name: "Meow Mix Seafood Medley Dry Cat Food 1.43kg",
    category: "cat",
    image: p6_img,
    new_price: 379.75,
    old_price: 400.75,
  },
  {
    id: 7,
    name: "Kit Cat Grain Free Tuna and Chicken Wet Cat Food 400g (2 cans)",
    category: "cat",
    image: p7_img,
    new_price: 178.0,
    old_price: 190.5,
  },
  {
    id: 8,
    name: "Carnilove Kitten Salmon and Turkey Dry Cat Food 2kg",
    category: "cat",
    image: p8_img,
    new_price: 1079.0,
    old_price: 1200.,
  },
  {
    id: 9,
    name: "Sheba Succulent Chicken Breast Wet Cat Food 85g (6 cans)",
    category: "cat",
    image: p9_img,
    new_price: 450.0,
    old_price: 500.0,
  },
  {
    id: 10,
    name: "Aozi Tuna Wet Cat Food 430g (2 cans",
    category: "cat",
    image: p10_img,
    new_price: 238.0,
    old_price: 240.0,
  },
  {
    id: 11,
    name: "IAMS Adult Chicken Dry Cat Food 1kg",
    category: "cat",
    image: p11_img,
    new_price: 499.0,
    old_price: 520.0,
  },
  {
    id: 12,
    name: "Zoi Adult Tuna Dry Cat Food 1kg",
    category: "cat",
    image: p12_img,
    new_price: 139.0,
    old_price: 150.0,
  },
  {
    id: 13,
    name: "Pedigree Adult Mini Grilled Liver Dry Dog Food 2.7kg",
    category: "dog",
    image: p13_img,
    new_price: 629.0,
    old_price: 650.0,
  },
  {
    id: 14,
    name: "Pedigree Pro Puppy High Protein All Breed Beef and Lamb Dry Dog Food 1.3kg",
    category: "dog",
    image: p14_img,
    new_price: 405.0,
    old_price: 420.0,
  },
  {
    id: 15,
    name: "Pedigree Mother and Baby Milk Dry Dog Food 1.3kg",
    category: "dog",
    image: p15_img,
    new_price: 329.0,
    old_price: 350.0,
  },
  {
    id: 16,
    name: "Pedigree Puppy Mini Milk Dry Dog Food 400g",
    category: "dog",
    image: p16_img,
    new_price: 115.0,
    old_price: 120.0,
  },
  {
    id: 17,
    name: "Vitality High Energy Small Breed Dry Dog Food 3kg",
    category: "dog",
    image: p17_img,
    new_price: 869.0,
    old_price: 900.0,
  },
  {
    id: 18,
    name: "Pedigree Adult Beef Wet Dog Food 400g (3 cans)",
    category: "dog",
    image: p18_img,
    new_price: 387.0,
    old_price: 400.0,
  },
  {
    id: 19,
    name: "Brit Pate and Meat Duck Wet Dog Food 800g",
    category: "dog",
    image: p19_img,
    new_price: 219.0,
    old_price: 250.0,
  },
  {
    id: 20,
    name: "Brit Pate and Meat Beef Wet Dog Food 400g (2 cans)",
    category: "dog",
    image: p20_img,
    new_price: 258.0,
    old_price: 270.0,
  },
  {
    id: 21,
    name: "Royal Canin Breed Health Nutrition Adult Pug Dry Dog Food 1.5kg",
    category: "dog",
    image: p21_img,
    new_price: 1150.0,
    old_price: 1200.0,
  },
  {
    id: 22,
    name: "Royal Canin Size Health Nutrition Adult Medium Wet Dog Food 140g (10 pouches)",
    category: "dog",
    image: p22_img,
    new_price: 1000.0,
    old_price: 1100.0,
  },
  {
    id: 23,
    name: "Royal Canin Size Health Nutrition Adult Mini Dry Dog Food 2kgt",
    category: "dog",
    image: p23_img,
    new_price: 1125.0,
    old_price: 1200.0,
  },
  {
    id: 24,
    name: "Royal Canin Size Health Nutrition Puppy Mini Indoor Dry Dog Food 1.5kg",
    category: "dog",
    image: p24_img,
    new_price: 1145.0,
    old_price: 1200.0,
  },
  {
    id: 25,
    name: "Kit Cat Soya Clump Lavender Cat Litter 7L",
    category: "accessoriess",
    image: p25_img,
    new_price: 439.0,
    old_price: 450.0,
  },
  {
    id: 26,
    name: "Kit Cat Classic Clump Lemon Cat Litter 10L",
    category: "accessoriess",
    image: p26_img,
    new_price: 349.0,
    old_price: 370.0,
  },
  {
    id: 27,
    name: "Jolly Triangle Cat Litter Box Blue P666",
    category: "accessoriess",
    image: p27_img,
    new_price: 639.0,
    old_price: 799.0,
  },
  {
    id: 28,
    name: "Approved Cat Condo SJ3 Brown",
    category: "accessoriess",
    image: p28_img,
    new_price: 5624.10,
    old_price: 6249.0,
  },
  {
    id: 29,
    name: "Zee.Cat Atlanta H-Harness and Leash Set",
    category: "accessoriess",
    image: p29_img,
    new_price: 629.0,
    old_price: 650.0,
  },
  {
    id: 30,
    name: "Doggo Heavy Duty Chain Dog Leash",
    category: "accessoriess",
    image: p30_img,
    new_price: 341.0,
    old_price: 379.0,
  },
  {
    id: 31,
    name: "Nina Ottosson Stages Melon Madness Puzzle and Play Level 2 Cat Toy",
    category: "accessoriess",
    image: p31_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 32,
    name: "Nina Ottosson Stages Rainy Day Puzzle and Play Level 3 Cat Toy",
    category: "accessoriess",
    image: p32_img,
    new_price: 1349.0,
    old_price: 1499.0,
  },
  {
    id: 33,
    name: "Doggo Medium Blue Firm Ball Dog Toy",
    category: "accessoriess",
    image: p33_img,
    new_price: 152.0,
    old_price: 169.0,
  },
  {
    id: 34,
    name: "Doggo Small Blue Ropey Bone Dog Toy",
    category: "accessoriess",
    image: p34_img,
    new_price: 143.0,
    old_price: 159.0,
  },
  {
    id: 35,
    name: "Kennel Pro Pet Fountain Filter Replacement 3s",
    category: "accessoriess",
    image: p36_img,
    new_price: 199.0,
    old_price: 220.0,
  },
  {
    id: 35,
    name: "Kennel Pro Pet Water Fountain",
    category: "accessoriess",
    image: p35_img,
    new_price: 999.0,
    old_price: 1100.0,
  },
];

export default all_product;
