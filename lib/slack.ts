import { UsergroupsUsersListArguments, UsersInfoArguments, WebClient } from '@slack/web-api'
import { Agent } from 'https'
const agent = new Agent({
    keepAlive: true,
    maxSockets: 30
})
export class SlackWebClient extends WebClient{
    groupId: string
    constructor(token: string, groupId: string){
        super(token, {agent})
        this.groupId = groupId
    }

    async validateCaller(user: string): Promise<Boolean> {
        const users = await this.usergroups.users.list({usergroup: this.groupId}).then(({users }) => users as string[])
        return new Set(users).has(user);
    }

    isTargetSelf(caller: string, target: string){
        return caller === target
    }
}

