import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { CarIcon, StarIcon, DocumentTextIcon, CogIcon } from '@sanity/icons';
import { schemaTypes } from './sanity/schemas';

function HiveMotorsLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
      <div style={{
        width: '28px', height: '28px', background: '#DA1D17', borderRadius: '6px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '13px' }}>H</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '13px', letterSpacing: '0.08em' }}>
          HIVE <span style={{ color: '#DA1D17' }}>MOTORS</span>
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '2px' }}>
          Admin Panel
        </span>
      </div>
    </div>
  );
}

export default defineConfig({
  name: 'hive-motors',
  title: 'Hive Motors Admin',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xo4wf08s',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  studio: {
    components: {
      logo: HiveMotorsLogo,
    },
  },

  plugins: [
    structureTool({
      title: 'Content',
      structure: (S) =>
        S.list()
          .title('Hive Motors')
          .items([
            S.listItem()
              .title('Cars for Sale')
              .icon(CarIcon)
              .child(
                S.list()
                  .title('Cars for Sale')
                  .items([
                    S.listItem()
                      .title('All Cars')
                      .icon(CarIcon)
                      .child(S.documentTypeList('car').title('All Cars')),
                    S.listItem()
                      .title('Available')
                      .icon(CarIcon)
                      .child(
                        S.documentTypeList('car')
                          .title('Available Cars')
                          .filter('_type == "car" && status == "available"')
                      ),
                    S.listItem()
                      .title('On Transit')
                      .icon(CarIcon)
                      .child(
                        S.documentTypeList('car')
                          .title('On Transit')
                          .filter('_type == "car" && status == "on-transit"')
                      ),
                    S.listItem()
                      .title('Sold')
                      .icon(CarIcon)
                      .child(
                        S.documentTypeList('car')
                          .title('Sold Cars')
                          .filter('_type == "car" && status == "sold"')
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .icon(DocumentTextIcon)
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Testimonials')
              .icon(StarIcon)
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
          ]),
    }),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
