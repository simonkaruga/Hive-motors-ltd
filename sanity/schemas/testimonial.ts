export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      description: 'e.g. James Kamau',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'review',
      title: 'Review',
      type: 'text',
      description: 'What the customer said about Hive Motors.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      description: '5 = Excellent, 1 = Poor',
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ 5 stars', value: 5 },
          { title: '⭐⭐⭐⭐ 4 stars', value: 4 },
          { title: '⭐⭐⭐ 3 stars', value: 3 },
          { title: '⭐⭐ 2 stars', value: 2 },
          { title: '⭐ 1 star', value: 1 },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'carPurchased',
      title: 'Car Purchased',
      type: 'string',
      description: 'e.g. Toyota Land Cruiser Prado 2020',
    },
    {
      name: 'photo',
      title: 'Customer Photo (optional)',
      type: 'image',
      description: 'A profile photo of the customer if they provided one.',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When did they leave this review?',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isApproved',
      title: 'Show on Website?',
      type: 'boolean',
      description: 'Only testimonials you approve here will appear on the website. New entries are hidden by default — review and turn ON to publish.',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'carPurchased',
      approved: 'isApproved',
    },
    prepare({ title, subtitle, approved }: Record<string, any>) {
      return {
        title: `${approved ? '✅' : '⏳'} ${title}`,
        subtitle: subtitle || 'No car listed',
      };
    },
  },
};
