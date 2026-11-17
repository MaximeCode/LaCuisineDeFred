import type { Schema, Struct } from "@strapi/strapi";

export interface DonneesLegalesPersonnelles extends Struct.ComponentSchema {
  collectionName: "components_donnees_legales_personnelles";
  info: {
    description: "Identit\u00E9 et coordonn\u00E9es de contact du dirigeant";
    displayName: "Personnelles";
    icon: "user";
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    nom: Schema.Attribute.String & Schema.Attribute.Required;
    prenom: Schema.Attribute.String & Schema.Attribute.Required;
    telephone: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DonneesLegalesProfessionnelles extends Struct.ComponentSchema {
  collectionName: "components_donnees_legales_professionnelles";
  info: {
    description: "Informations l\u00E9gales et si\u00E8ge de l'activit\u00E9";
    displayName: "Professionnelles";
    icon: "briefcase";
  };
  attributes: {
    codeApe: Schema.Attribute.String;
    codePostal: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    denomination: Schema.Attribute.String & Schema.Attribute.Required;
    formeJuridique: Schema.Attribute.String & Schema.Attribute.Required;
    qualiteDirecteur: Schema.Attribute.String & Schema.Attribute.Required;
    rue: Schema.Attribute.String & Schema.Attribute.Required;
    siren: Schema.Attribute.String;
    siret: Schema.Attribute.String & Schema.Attribute.Required;
    tva: Schema.Attribute.String;
    ville: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LeChefPhilosophie extends Struct.ComponentSchema {
  collectionName: "components_le_chef_philosophies";
  info: {
    description: "Point de philosophie du chef";
    displayName: "Philosophie";
    icon: "bulletList";
  };
  attributes: {
    description: Schema.Attribute.Text;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export namespace Public {
    export interface ComponentSchemas {
      "donnees-legales.personnelles": DonneesLegalesPersonnelles;
      "donnees-legales.professionnelles": DonneesLegalesProfessionnelles;
      "le-chef.philosophie": LeChefPhilosophie;
    }
  }
}
