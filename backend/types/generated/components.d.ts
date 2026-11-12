import type { Schema, Struct } from '@strapi/strapi';

export interface LeChefPhilosophie extends Struct.ComponentSchema {
  collectionName: 'components_le_chef_philosophies';
  info: {
    description: 'Point de philosophie du chef';
    displayName: 'Philosophie';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'le-chef.philosophie': LeChefPhilosophie;
    }
  }
}
