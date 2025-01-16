import express from "express";
import multer from "multer";
import fs from "fs";
import * as path from "node:path";

async function createDirectoryIfNotExists(dir: string)
{
    try {
        await fs.promises.access(dir);
    } catch (error) {
        await fs.promises.mkdir(dir, { recursive: true });
    }
}

export function uploadFile(fieldName: string, destination: string) {

    const storage = multer({
        storage: multer.diskStorage({
            destination: async function (req, file, cb) {
                await createDirectoryIfNotExists(destination);
                cb(null, destination);
            },
            filename: async function (req, file, cb) {
                cb(null, `temp_${Date.now()}_${file.originalname}`);
            }
        })
    })

    return storage.single(fieldName);
}

export function uploadMultipleFile(fieldsName: multer.Field[], destination: string) {

    const storage = multer({
        storage: multer.diskStorage({
            destination: async function (req, file, cb) {
                await createDirectoryIfNotExists(destination);
                cb(null, destination);
            },
            filename: async function (req, file, cb) {
                cb(null, `temp_${Date.now()}_${file.originalname}`);
            }
        })
    })

    return storage.fields(fieldsName);
}


export async function saveUploadedFile(file: Express.Multer.File, newName: string)
{
    const previousPath = file.path;
    const directory = path.dirname(previousPath);
    const extension = path.extname(previousPath);
    const avatarFileName = `${newName}${extension}`;
    const newPath = path.join(directory, avatarFileName);

    try {
        await fs.promises.rename(previousPath, newPath);
    } catch (error) {
        console.error("Erreur: Le fichier n'a pas pu être sauvegardé: ", error);
    }

    return newPath;
}

export async function deleteUploadedFile(file: Express.Multer.File|undefined)
{
    if (file)
        await fs.promises.rm(file.path);
}
