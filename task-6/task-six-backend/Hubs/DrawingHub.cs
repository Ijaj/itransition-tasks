using Microsoft.AspNetCore.SignalR;

namespace TaskSix.Hubs
{
    public class DrawingHub : Hub
    {
        public async Task SendMessage(string drawingData)
        {
            string boardId = drawingData.Split('|')[1];
            await Clients.Groups(boardId).SendAsync("ReceiveDrawing", drawingData);
        }

        public async Task JoinBoard(string boardId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, boardId);
        }
    }
}
