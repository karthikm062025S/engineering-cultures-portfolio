export interface SectionContent {
  id: number;
  heading: string;
  paragraph: string;
  bridgingLine?: string;
  image: string;
  imageAlt: string;
  isIntro?: boolean;
}

export interface ScrollAdventureProps {
  sections: SectionContent[];
}