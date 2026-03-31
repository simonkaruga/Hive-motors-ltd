import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './sanity/schemas';

function HiveMotorsLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
      <div style={{
        width: '30px',
        height: '30px',
        background: '#DA1D17',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '13px', letterSpacing: '-0.5px' }}>H</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '13px', letterSpacing: '0.08em' }}>
          HIVE <span style={{ color: '#DA1D17' }}>MOTORS</span>
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
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
      structure: (S) =>
        S.list()
          .title('Hive Motors Content')
          .items([
            S.listItem()
              .title('🚗 Cars for Sale')
              .child(S.documentTypeList('car').title('All Cars')),
            S.listItem()
              .title('⭐ Customer Testimonials')
              .child(S.documentTypeList('testimonial').title('All Testimonials')),
            S.listItem()
              .title('📝 Blog Posts')
              .child(S.documentTypeList('post').title('All Posts')),
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
