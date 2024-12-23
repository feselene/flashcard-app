import { Request, Response } from "express";
import Flashcard from "../models/Flashcard"; // Adjust the path based on your project structure

// Create a new flashcard
export const createFlashcard = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const flashcard = new Flashcard({ question, answer });
    await flashcard.save();
    res.status(201).json({ message: "Flashcard created successfully", flashcard });
  } catch (error) {
    res.status(500).json({ message: "Error creating flashcard", error });
  }
};

// Get all flashcards
export const getAllFlashcards = async (req: Request, res: Response) => {
  try {
    const flashcards = await Flashcard.find();
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving flashcards", error });
  }
};

// Get a single flashcard
export const getFlashcardById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving flashcard", error });
  }
};

// Update a flashcard
export const updateFlashcard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const flashcard = await Flashcard.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    res.status(200).json({ message: "Flashcard updated successfully", flashcard });
  } catch (error) {
    res.status(500).json({ message: "Error updating flashcard", error });
  }
};

// Delete a flashcard
export const deleteFlashcard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findByIdAndDelete(id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flashcard", error });
  }
};
