import bcrypt from 'bcrypt';

export const createHash = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const comparePasswords = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password,hash);
    return !!result;
};