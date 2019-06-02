using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalR.Hubs
{
    public class chatHub  :Hub
    {
        public async Task sendMessage(string user, string message,string host)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, host);
        }

    }
}
