// import user model and authentication functions
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';
import bcrypt from 'bcrypt';

//interfaces to set up object type structures for user, user input, and login 
interface User {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    team?: any[];
    box?: any[];
    inventory?: any[];
}
interface AddUserArgs {
    input: {
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    }
}
interface LoginUserArgs {
    username: string;
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
            const token = signToken(user.username, user.first_name, user.last_name, user.email, user._id);
            return { token, user };
        },
        // login, which checks for the user in the database, matches password, and sends back a new token if the data is correct
        login: async (_parent: any, { username, password }: LoginUserArgs) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('User not found. Was the intention to signup?');
            }
            const pwAuth = await user.isCorrectPassword(password);
            if (!pwAuth) {
                throw new AuthenticationError('Username or password incorrect');
            }
            const token = signToken(user.username, user.first_name, user.last_name, user.username, user._id);
            return { token, user };
        },
        updateProfile: async (_parent: any, { input }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            const updatedUsername = input.username;
            const updatedFirstName = input.first_name;
            const updatedLastName = input.last_name;
            const updatedEmail = input.email;
            try {
                console.log(`Updating profile for user ${context.user._id}`)
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $set: { username: updatedUsername, first_name: updatedFirstName, last_name: updatedLastName, email: updatedEmail } },
                    { new: true, runValidators: true }
                );
                console.log("User profile updated!");
                return updatedUser;
            } catch (err: any) {
                console.error(err.errorResponse.errmsg);
                if (err.errorResponse.errmsg.includes("username_1 dup key")) {
                    throw new Error('Error updating user: Username already exist');
                } else if (err.errorResponse.errmsg.includes("email_1 dup key")) {
                    throw new Error('Error updating user: Email already exist');
                } else {
                    throw new Error(`Error updating user: ${err.errorResponse.errmsg}`);
                }
            }
        },
        updatePassword: async (_parent: any, { password }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            const saltRounds = 10;
            const updatedPassword = await bcrypt.hash(password, saltRounds);
            try {
                console.log(`Updating profile for user ${context.user._id}`)
                await User.findByIdAndUpdate(
                    context.user._id,
                    { $set: { password: updatedPassword } },
                    { new: true, runValidators: true }
                );
                console.log("User profile updated!");
                return "Password Updated Successfully!";
            } catch (err) {
                console.error(err);
                throw new Error('Error updating user');
            }
        },
        confirmPassword: async (_parent: any, { currentPassword }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            const user = await User.findById(context.user._id);
            if (!user) {
                throw new AuthenticationError('User not found.');
            }
            const pwAuth = await user.isCorrectPassword(currentPassword);
            if (!pwAuth) {
                throw new AuthenticationError('Username or password incorrect');
            }
            return true;
        },
        deleteUser: async (_parent: any, { _id }: any, context: any) => {
            if (!context.user) throw new Error('You must be logged in');
            try {
                console.log(`Deleting user ${_id}`)
                await User.findByIdAndDelete(
                    _id
                );
                console.log("User removed!");
                return "User deleted!";
            } catch (err) {
                console.error(err);
                throw new Error('Error deleting user');
            }
        },
        catchPokemon: async (_parent: any, { input }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            try {
                console.log(`Catching Pokemon under PokemonId ${input.pokemonId} for user ${context.user._id}`)
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { box: input } },
                    { new: true, runValidators: true }
                );
                console.log("Pokemon caught!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error catching Pokemon');
            }
        },
        releasePokemon: async (_parent: any, { _id }: any, context: any) => {
            if (!context.user) throw new Error('You must be logged in');
            try {
                console.log(`Releasing Pokemon ${_id} from user ${context.user._id}'s box`)
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { box: { _id } } },
                    { new: true }
                );
                console.log("Pokemon released!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error releasing Pokemon');
            }
        },
        resetBox: async (_parent: any, { _id }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            try {
                console.log(`Resetting ${context.user._id}'s box...`)
                const updatedUser = await User.findByIdAndUpdate(
                    _id,
                    { $set: { box: [] } },
                    { new: true, runValidators: true }
                );
                console.log("The users box was reset!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error resetting the users box');
            }
        },
        addToTeam: async (_parent: any, { input, _id }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            try {
                console.log(`Adding PokemonId ${input.pokemonId} to user ${context.user._id}'s team`)
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { team: input }, $pull: { box: { _id } } },
                    { new: true, runValidators: true }
                );
                console.log("The Pokemon was added to the team!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error adding Pokemon to the users team');
            }
        },
        removeFromTeam: async (_parent: any, { input, _id }: any, context: any) => {
            if (!context.user) throw new Error('You must be logged in');
            try {
                console.log(`Removing Pokemon ${input.pokemonId} from user ${context.user._id}'s team`)
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { team: { _id } }, $addToSet: { box: input } },
                    { new: true }
                );
                console.log("Pokemon removed from team!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error releasing Pokemon');
            }
        },
        resetTeam: async (_parent: any, { _id }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            try {
                console.log(`Resetting ${context.user._id}'s team...`)
                const updatedUser = await User.findByIdAndUpdate(
                    _id,
                    { $set: { team: [] } },
                    { new: true, runValidators: true }
                );
                console.log("The users team was reset!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error resetting the users team');
            }
        },
        saveItem: async (_parent: any, { input }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            try {
                console.log(`Adding item ${input.itemId} to user ${context.user._id}'s inventory`)
                const foundUser = await User.findById(context.user._id);
                let findItem;
                for (let i = 0; i < foundUser!.inventory.length; i++) {
                    if (input.itemId === foundUser!.inventory[i].itemId) {
                        findItem = foundUser!.inventory[i];
                    }
                }
                if (findItem) {
                    const updatedData = findItem.quantity + 1
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, 'inventory.itemId': input.itemId },
                        { $set: { 'inventory.$.quantity': updatedData } },
                        { new: true, runValidators: true }
                    );
                    console.log("The items inventory quanitity increased!");
                    return updatedUser;
                } else {
                    const updatedUser = await User.findByIdAndUpdate(
                        context.user._id,
                        { $addToSet: { inventory: input } },
                        { new: true, runValidators: true }
                    );
                    console.log("The item was added to the inventory!");
                    return updatedUser;
                }
            } catch (err) {
                console.error(err);
                throw new Error('Error adding item to the users inventory');
            }
        },
        useItem: async (_parent: any, { itemId }: any, context: any) => {
            if (!context.user) throw new Error('You must be logged in');
            try {
                console.log(`Using item ${itemId} from user ${context.user._id}'s inventory`)
                const foundUser = await User.findById(context.user._id);
                let findItem;
                for (let i = 0; i < foundUser!.inventory.length; i++) {
                    if (itemId === foundUser!.inventory[i].itemId) {
                        findItem = foundUser!.inventory[i];
                    }
                }
                if (findItem && findItem.quantity > 1) {
                    const updatedData = findItem.quantity - 1
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, 'inventory.itemId': itemId },
                        { $set: { 'inventory.$.quantity': updatedData } },
                        { new: true, runValidators: true }
                    );
                    console.log("Item used!");
                    return updatedUser;
                } else {
                    const updatedUser = await User.findByIdAndUpdate(
                        context.user._id,
                        { $pull: { inventory: { itemId } } },
                        { new: true }
                    );
                    console.log("Item used!");
                    return updatedUser;
                }
            } catch (err) {
                console.error(err);
                throw new Error('Error using item');
            }
        },
        removeOneOfItem: async (_parent: any, { itemId }: any, context: any) => {
            if (!context.user) throw new Error('You must be logged in');
            try {
                console.log(`Removing 1 of item ${itemId} from user ${context.user._id}'s inventory`)
                const foundUser = await User.findById(context.user._id);
                let findItem;
                for (let i = 0; i < foundUser!.inventory.length; i++) {
                    if (itemId === foundUser!.inventory[i].itemId) {
                        findItem = foundUser!.inventory[i];
                    }
                }
                if (findItem && findItem.quantity > 1) {
                    const updatedData = findItem.quantity - 1
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, 'inventory.itemId': itemId },
                        { $set: { 'inventory.$.quantity': updatedData } },
                        { new: true, runValidators: true }
                    );
                    console.log("One of this item removed!");
                    return updatedUser;
                } else {
                    const updatedUser = await User.findByIdAndUpdate(
                        context.user._id,
                        { $pull: { inventory: { itemId } } },
                        { new: true }
                    );
                    console.log("This item only had one quanitity, so the entire item was removed");
                    return updatedUser;
                }
            } catch (err) {
                console.error(err);
                throw new Error('Error removing item');
            }
        },
        removeAllOfItem: async (_parent: any, { itemId }: any, context: any) => {
            if (!context.user) throw new Error('You must be logged in');
            try {
                console.log(`Removing all of item ${itemId} from user ${context.user._id}'s inventory`)
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { inventory: { itemId } } },
                    { new: true }
                );
                console.log("Item removed!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error removing item');
            }
        },
        resetInventory: async (_parent: any, { _id }: any, context: any) => {
            if (!context.user) throw new AuthenticationError('You must be logged in');
            try {
                console.log(`Resetting ${context.user._id}'s inventory...`)
                const updatedUser = await User.findByIdAndUpdate(
                    _id,
                    { $set: { inventory: [] } },
                    { new: true, runValidators: true }
                );
                console.log("The users inventory was reset!");
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error('Error resetting the users inventory');
            }
        },
    },
};

// exports resolvers to be used elsewhere
export default resolvers;