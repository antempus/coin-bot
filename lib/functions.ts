import { AzureFunction, Context } from "@azure/functions"
import axios from 'axios'
import { parseRawBody } from './parsers';
import { CommandDocument, CommandOptions, UserDocument } from './types';
const groupId = process.env.group_id
const botToken = process.env.oauth_token;
const userToken = process.env.bot_oauth_token;
const webHook = process.env.web_hook
if (!botToken || !userToken || !groupId || !webHook){
    const maskedWebHook = webHook ? 'present' : 'missing'
    throw Error(`missing Tokens\nbotToken: ${botToken}\nuserToken: ${userToken}\ngroupId: ${groupId}\nwebhook: ${maskedWebHook}
    `)
}

/**
 *
 * @param context
 * @param req
 * @param records
 * @param authUsers
 */
export const coinInitTrigger: AzureFunction = async function (context: Context): Promise<void> {
    context.log.info('Function Triggered');
    const { req: { rawBody }, log } = context
    try{
        // clean up inputs
        const commandDocument = parseRawBody(log, rawBody)

        // output to a queue to processing
        context.bindings.commandDocument = commandDocument

        // set response to user
        context.res.body = `processing request...`

    }
    catch(error){
        context.res = {
            body: error.message
        }
    }
};

/**
 *
 * @param context
 * @param command
 */
export const operationsTrigger: AzureFunction = async function (context: Context, command: CommandDocument, existingRecord: UserDocument): Promise<void> {
    context.log('Queue trigger function processed work item', command)

    // build message:

    await axios.post(webHook, { text: `coin operation complete`, attachments: [
        {
            text: ` ${command.caller} add/removed ${command.qty} ${command.coinType} from ${command.target}`
        }
    ] }).catch(error => {
        console.error(error);
        throw error
    })
};
