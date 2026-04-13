import { MultiImageUpload } from '../components/MultiImageUpload'

export default {
  name: 'car',
  title: 'Cars',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Car Title',
      type: 'string',
      description: 'e.g. "Toyota RAV4 2020" or "Subaru Forester 2019 XT"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Click "Generate" to auto-fill this from the title above. Do not edit manually.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Car Status',
      type: 'string',
      description: 'Is this car available to buy, still on the way, or already sold?',
      options: {
        list: [
          { title: '✅ Available — ready to buy', value: 'available' },
          { title: '🚢 On Transit — being shipped', value: 'on-transit' },
          { title: '🔴 Sold', value: 'sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: '🇯🇵 Fresh Import (from Japan)', value: 'fresh-import' },
          { title: '🇰🇪 Locally Used (already in Kenya)', value: 'locally-used' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'images',
      title: 'Car Photos',
      type: 'array',
      description: 'Upload photos here. Drag to reorder — the FIRST photo will be the cover/main image shown in listings.',
      components: {
        input: MultiImageUpload,
      },
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            title: 'Photo description (auto-filled)',
            type: 'string',
            initialValue: ({ parent, document }: any) => {
              const { year, make, model, title } = document ?? {};
              return title || [year, make, model].filter(Boolean).join(' ') || 'Hive Motors car photo';
            },
            readOnly: false,
            description: 'Auto-filled. You can leave this as is.',
          },
        ],
      }],
      options: { layout: 'grid' },
      validation: (Rule: any) => Rule.required().min(1).error('Please upload at least one photo'),
    },
    {
      name: 'price',
      title: 'Price (KSh)',
      type: 'number',
      description: 'Enter the price in Kenya Shillings — numbers only, no commas. e.g. 2500000',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'year',
      title: 'Year of Manufacture',
      type: 'number',
      description: 'e.g. 2020',
      validation: (Rule: any) => Rule.required().min(1990).max(new Date().getFullYear()),
    },
    {
      name: 'make',
      title: 'Make (Brand)',
      type: 'string',
      description: 'e.g. Toyota, Subaru, Nissan, Honda, Land Rover',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'e.g. RAV4, Forester, X-Trail, CRV, Discovery',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bodyType',
      title: 'Body Type',
      type: 'string',
      options: {
        list: [
          { title: 'SUV', value: 'suv' },
          { title: 'Sedan', value: 'sedan' },
          { title: 'Hatchback', value: 'hatchback' },
          { title: 'Pickup / Double Cab', value: 'pickup' },
          { title: 'Van / Minivan', value: 'van' },
          { title: 'Coupe', value: 'coupe' },
        ],
      },
    },
    {
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      description: 'Numbers only. e.g. 45000 means 45,000 km',
    },
    {
      name: 'engine',
      title: 'Engine',
      type: 'string',
      description: 'e.g. 2.0L, 2500cc, 1.8L Hybrid',
    },
    {
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: [
          { title: 'Automatic', value: 'automatic' },
          { title: 'Manual', value: 'manual' },
        ],
      },
    },
    {
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Petrol', value: 'petrol' },
          { title: 'Diesel', value: 'diesel' },
          { title: 'Hybrid (Petrol+Electric)', value: 'hybrid' },
          { title: 'Electric', value: 'electric' },
        ],
      },
    },
    {
      name: 'driveType',
      title: 'Drive Type',
      type: 'string',
      options: {
        list: [
          { title: '4WD (Four Wheel Drive)', value: '4wd' },
          { title: '2WD (Two Wheel Drive)', value: '2wd' },
          { title: 'AWD (All Wheel Drive)', value: 'awd' },
        ],
      },
    },
    {
      name: 'colour',
      title: 'Colour',
      type: 'string',
      description: 'e.g. Pearl White, Silver, Black, Blue',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Write a short description of the car. Mention condition, history, any extras.',
      of: [{ type: 'block' }],
    },
    {
      name: 'features',
      title: 'Features / Extras',
      type: 'array',
      description: 'Click "Add item" to list features one by one. e.g. Sunroof, Reverse Camera, Leather Seats, Android Auto',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'isFeatured',
      title: 'Show on Homepage?',
      type: 'boolean',
      description: 'Leave this ON — the car will appear in the "Latest Arrivals" section on the homepage. Turn OFF to hide it from the homepage (it will still be in the inventory list).',
      initialValue: true,
    },
    {
      name: 'expectedArrival',
      title: 'Expected Arrival Date',
      type: 'date',
      description: 'Only for On Transit cars — when do you expect it to arrive in Kenya?',
      hidden: ({ document }: any) => document?.status !== 'on-transit',
    },
  ],
};
