export const natsWrapper = {
    connect: () => Promise.resolve(),
    client: {
        // publish: (subject: string, data: string , callback: Function) => callback()
        publish: jest.fn().mockImplementation((subject: string, data: string , callback: Function) => {
            callback();
        })
    }
}