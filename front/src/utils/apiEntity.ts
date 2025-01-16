export interface Comment {
    id: number;
    likes: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    faceDescriptor: Float32Array[];
    roles: string[];
    pictureUrl: string;
    aura: number;
    createdAt: string;
    updatedAt: string;
}

export interface Registration {
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface Event {
    id: number;
    label: string;
    title: string;
    description: string;
    imageUrl: string;
    likes: number;
    scheduledAt: string;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
    author: User;
    registeredUsers: Registration[];
}
