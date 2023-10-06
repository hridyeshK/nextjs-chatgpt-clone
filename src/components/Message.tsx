export const Message = ({userIsBot, message}: {userIsBot: boolean, message: string}) => {
    const isBot = userIsBot;
    const messageColor = isBot ? 'bg-gray-500' : 'bg-blue-500';

    return (
        <div className={`p-4 ${messageColor}`}>
            {message}
        </div>
    );
    
}