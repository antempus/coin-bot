import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { parse, ParsedQs } from 'qs';
import { parseInputs } from '../lib/parsers';
import { CommandOpts } from './types';

export const coinInitTrigger: AzureFunction = async function (context: Context, req: HttpRequest, records: Object[], authUsers: String[]): Promise<void> {
    context.log.info('Function Triggered');
    if (req.rawBody) {
        const decodedBody: ParsedQs = parse(req.rawBody);
        try {
            context.log.info('parsing input')
            const commandOpts = parseInputs(decodedBody.text)
            context.res.body = commandOpts
        }
        catch (error) {
            context.log.error(`parsing error: ${error.message}`)
            context.res.body = error.message
        }
    }
    else {
        context.res = {
            body: 'missing inputs'
        }
    }
};

export const operationsTrigger: AzureFunction = async function (context: Context, command: CommandOpts): Promise<void> {
    context.log('Queue trigger function processed work item', command);
};
