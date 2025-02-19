// import user model and authentication functions
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

//interfaces to set up object type structures for user, user input, and login 
interface User {
    _id: string;
    username: string;
    email: string;
}
interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}
interface LoginUserArgs {
    email: string;
    password: string;
}

// set up resolvers which handle any query or mutation request send to the server
const resolvers = {
    // me query, which returns the data of the user held in the auth token
    Query: {
        Me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
              const userData = await User.findById(context.user._id).select('-__v -password');
              return userData;
            }
            throw new AuthenticationError('Not logged in');
          },
    },
    Mutation: {
        // add user, which adds a user to the database using the add user arguments
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        // login, which checks for the user in the database, matches password, and sends back a new token if the data is correct
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('User not found. Was the intention to signup?');
            }
            const pwAuth = await user.isCorrectPassword(password);
            if (!pwAuth) {
                throw new AuthenticationError('Username or password incorrect');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
    },
};

// exports resolvers to be used elsewhere
export default resolvers;