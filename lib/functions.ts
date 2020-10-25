import { AzureFunction, Context } from "@azure/functions"
import axios from 'axios'
import { parseRawBody } from './parsers';
import { SlackWebClient } from './slack';
import { CommandDocument, UserDocument } from './types';

const groupId = process.env.group_id
const userToken = process.env.oauth_token;
const botToken = process.env.bot_oauth_token;
const webHook = process.env.web_hook

if (!botToken || !userToken || !groupId || !webHook) {
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
    context.log.info('Bot Function Triggered');
    const { req: { rawBody }, log } = context
    const botClient = new SlackWebClient(botToken, groupId)
    const userClient = new SlackWebClient(userToken, groupId)
    try {
        // clean up inputs
        const commandDocument = parseRawBody(log, rawBody)

        // check caller isn't targeting themselves
        const isSelf = await botClient.isTargetSelf(commandDocument.caller, commandDocument.target)
        if (isSelf) {
            throw Error('cannot self enrich :disapproval:')
        }

        await userClient.validateCaller(commandDocument.caller).then(result => { if (!result) throw Error('not an coin admin') }).catch(error => { console.error(error); throw error })

        // output to a queue to processing
        context.bindings.commandDocument = commandDocument

        // set response to user
        context.res.body = `processing request...`

    }
    catch (error) {
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
    context.log.info('Queue Function Triggered');
    if (!existingRecord) {

    }
    else {

    }

    // build response
    await axios.post(webHook, {
        text: `coin operation complete`, attachments: [
            {
                text: `@${command.caller} ${command.operation} ${command.qty} ${command.coinType} from @${command.target}`
            }
        ]
    }).catch(error => {
        console.error(error);
        throw error
    })
};
