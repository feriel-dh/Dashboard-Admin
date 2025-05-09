
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search } from 'lucide-react';

interface Message {
  id: number;
  sender: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
  objectId: number;
  objectTitle: string;
  objectStatus: 'lost' | 'found';
}

interface Conversation {
  messages: Message[];
}

const Messages = () => {
  const [conversations, setConversations] = useState<Record<number, Message[]>>({
    1: [
      {
        id: 1,
        sender: {
          name: 'Manar Chafei',
          initials: 'Mch',
        },
        content: 'Bonjour, j\'ai vu que vous avez trouvé un portefeuille noir. Est-ce qu\'il contient une carte d\'identité au nom de Manar Chafei ?',
        timestamp: '15:32',
        read: true,
        objectId: 1,
        objectTitle: 'Portefeuille noir',
        objectStatus: 'found',
      },
      {
        id: 2,
        sender: {
          name: 'Vous',
          initials: 'AD',
        },
        content: 'Bonjour Manar, effectivement il y a bien une carte d\'identité à ce nom. Pouvez-vous me décrire d\'autres éléments du portefeuille pour confirmer qu\'il s\'agit bien du vôtre ?',
        timestamp: '15:45',
        read: true,
        objectId: 1,
        objectTitle: 'Portefeuille noir',
        objectStatus: 'found',
      },
      {
        id: 3,
        sender: {
          name: 'Manar Chafei',
          initials: 'SM',
        },
        content: 'Bien sûr ! Il s\'agit d\'un portefeuille en cuir noir de marque Longchamp, avec un logo discret sur le devant. Il contient également une carte bancaire Visa, une carte de transport, et une photo de famille avec deux enfants.',
        timestamp: '16:03',
        read: true,
        objectId: 1,
        objectTitle: 'Portefeuille noir',
        objectStatus: 'found',
      },
    ],
    2: [
      {
        id: 4,
        sender: {
          name: 'Dhia dhifaoui',
          initials: 'Ddh',
        },
        content: 'Bonjour, j\'ai perdu mes clés près de la station Châtelet. Avez-vous des informations à ce sujet ?',
        timestamp: '10:15',
        read: false,
        objectId: 2,
        objectTitle: 'Clés avec porte-clés bleu',
        objectStatus: 'lost',
      },
    ],
    3: [
      {
        id: 5,
        sender: {
          name: 'Cyrine dh',
          initials: 'Cdh',
        },
        content: 'Bonjour, je pense avoir trouvé votre sac à main rouge hier à la station République. Pouvez-vous me donner plus de détails ?',
        timestamp: 'Hier',
        read: false,
        objectId: 4,
        objectTitle: 'Sac à main rouge',
        objectStatus: 'lost',
      },
    ],
  });
  
  // Active conversation handling
  const [activeConversationId, setActiveConversationId] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversationId) return;
    
    const newMessageObj: Message = {
      id: Date.now(),
      sender: {
        name: 'Vous',
        initials: 'AD',
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      objectId: activeConversationId,
      objectTitle: conversations[activeConversationId][0].objectTitle,
      objectStatus: conversations[activeConversationId][0].objectStatus,
    };
    
    setConversations(prev => ({
      ...prev,
      [activeConversationId]: [...prev[activeConversationId], newMessageObj]
    }));
    
    setNewMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Filter for conversation list
  const [searchTerm, setSearchTerm] = useState('');
  
  const conversationEntries = Object.entries(conversations)
    .map(([id, messages]) => {
      const lastMessage = messages[messages.length - 1];
      const unreadCount = messages.filter(m => !m.read && m.sender.name !== 'Vous').length;
      
      return {
        id: Number(id),
        lastMessage,
        unreadCount,
        contact: messages[0].sender.name !== 'Vous' ? messages[0].sender : messages[1]?.sender,
        objectTitle: messages[0].objectTitle,
        objectStatus: messages[0].objectStatus,
      };
    })
    .filter(conv => 
      conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      conv.objectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Gérez vos conversations avec les utilisateurs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="md:col-span-1 h-full overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <div className="flex-1 overflow-auto">
            {conversationEntries.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  activeConversationId === conv.id ? 'bg-muted' : ''
                }`}
              >
                <Avatar>
                  <AvatarImage src={conv.contact?.avatar} />
                  <AvatarFallback>{conv.contact?.initials}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate">{conv.contact?.name}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {conv.lastMessage.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-start mt-1">
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage.content}
                    </p>
                    {conv.unreadCount > 0 && (
                      <Badge variant="default" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-1 text-xs">
                    <Badge variant="outline" className="font-normal">
                      {conv.objectTitle}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            
            {conversationEntries.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">Aucune conversation trouvée</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Active Conversation */}
        <Card className="md:col-span-2 h-full flex flex-col overflow-hidden">
          {activeConversationId && conversations[activeConversationId] ? (
            <>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center text-lg">
                      {conversations[activeConversationId][0].sender.name !== 'Vous' 
                        ? conversations[activeConversationId][0].sender.name 
                        : conversations[activeConversationId][1]?.sender.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>Objet:</span>
                      <Badge variant={conversations[activeConversationId][0].objectStatus === 'lost' ? 'destructive' : 'default'}>
                        {conversations[activeConversationId][0].objectTitle}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {conversations[activeConversationId].map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender.name === 'Vous' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender.name !== 'Vous' && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>{message.sender.initials}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender.name === 'Vous'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs mt-1 block text-right opacity-70">
                        {message.timestamp}
                      </span>
                    </div>
                    
                    {message.sender.name === 'Vous' && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-4">
                <div className="flex items-end gap-2">
                  <Textarea
                    placeholder="Écrivez votre message..."
                    className="resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button 
                    size="icon" 
                    disabled={!newMessage.trim()}
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-medium">Sélectionnez une conversation</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Choisissez une conversation dans la liste pour commencer
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
