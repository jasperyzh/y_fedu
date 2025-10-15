// Simple utility functions for working with dinosaur data
import dinosaursData from "../data/data.json";

export interface Dinosaur {
  name?: string;
  description: string;
}

export class DinosaurService {
  private static dinosaurs: Dinosaur[] = dinosaursData;

  // Get all dinosaurs with names (filter out unnamed ones)
  static getNamedDinosaurs(): Dinosaur[] {
    return this.dinosaurs.filter((dino) => dino.name);
  }

  // Create a URL-friendly slug from dinosaur name
  static createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Get dinosaur by slug
  static getDinosaurBySlug(slug: string): Dinosaur | undefined {
    return this.dinosaurs.find((dino) => {
      if (!dino.name) return false;
      return this.createSlug(dino.name) === slug;
    });
  }

  // Get all dinosaurs with their slugs for linking
  static getDinosaursWithSlugs() {
    return this.getNamedDinosaurs().map((dino) => ({
      ...dino,
      slug: this.createSlug(dino.name!),
    }));
  }
}

export default DinosaurService;
