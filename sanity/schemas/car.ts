export default {
  name: 'car',
  title: 'Cars',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Car Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ Available', value: 'available' },
          { title: '🚢 On Transit', value: 'on-transit' },
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
          { title: '🇯🇵 Fresh Import', value: 'fresh-import' },
          { title: '🇰🇪 Locally Used', value: 'locally-used' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'images',
      title: 'Photos — drag to reorder, first photo is the cover',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'alt',
            title: 'Alt text (auto-filled)',
            type: 'string',
            initialValue: ({ parent, document }: any) => {
              const { year, make, model, title } = document ?? {};
              return title || [year, make, model].filter(Boolean).join(' ') || 'Hive Motors car photo';
            },
            readOnly: false,
            description: 'Auto-filled from car details. You can leave this as is.',
          },
        ],
      }],
      options: {
        layout: 'grid',
      },
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'price',
      title: 'Price (KSh)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1990).max(new Date().getFullYear()),
    },
    {
      name: 'make',
      title: 'Make',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bodyType',
      title: 'Body Type',
      type: 'string',
      options: {
        list: ['suv', 'sedan', 'hatchback', 'pickup', 'van', 'coupe'],
      },
    },
    {
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
    },
    {
      name: 'engine',
      title: 'Engine',
      type: 'string',
    },
    {
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: ['automatic', 'manual'],
      },
    },
    {
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: ['petrol', 'diesel', 'hybrid', 'electric'],
      },
    },
    {
      name: 'driveType',
      title: 'Drive Type',
      type: 'string',
      options: {
        list: ['4wd', '2wd', 'awd'],
      },
    },
    {
      name: 'colour',
      title: 'Colour',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'New cars are featured by default. Uncheck to hide from homepage.',
      initialValue: true,
    },
    {
      name: 'expectedArrival',
      title: 'Expected Arrival Date',
      type: 'date',
      hidden: ({ document }: any) => document?.status !== 'on-transit',
    },
  ],
};
