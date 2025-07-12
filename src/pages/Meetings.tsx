import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Vote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { AddMeetingDialog } from '@/components/AddMeetingDialog';
import { AddVoteDialog } from '@/components/AddVoteDialog';
import { useToast } from '@/hooks/use-toast';

const Meetings = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [meetings, setMeetings] = useState([
    {
      id: '1',
      title: 'মাসিক সাধারণ সভা',
      description: 'জুলাই মাসের আয়-ব্যয় পর্যালোচনা এবং নতুন বিনিয়োগ নিয়ে আলোচনা',
      date: '2024-08-15',
      time: '19:00',
      location: 'কমিউনিটি সেন্টার, ধানমন্ডি',
      status: 'upcoming',
      attendees: 18,
      totalMembers: 23
    },
    {
      id: '2',
      title: 'বার্ষিক পরিকল্পনা সভা',
      description: '২০২৫ সালের বিনিয়োগ পরিকল্পনা এবং লক্ষ্য নির্ধারণ',
      date: '2024-07-20',
      time: '18:30',
      location: 'অনলাইন (Zoom)',
      status: 'completed',
      attendees: 20,
      totalMembers: 23
    },
    {
      id: '3',
      title: 'জরুরি সভা - নতুন প্রকল্প',
      description: 'চট্টগ্রামে নতুন বাণিজ্যিক প্রকল্প নিয়ে আলোচনা',
      date: '2024-07-05',
      time: '20:00',
      location: 'সেক্রেটারির বাসা',
      status: 'completed',
      attendees: 15,
      totalMembers: 23
    }
  ]);

  const handleAddMeeting = (newMeeting: any) => {
    setMeetings([...meetings, newMeeting]);
  };

  const [votes, setVotes] = useState([
    {
      id: '1',
      title: 'সিলেট টি গার্ডেন বিনিয়োগ',
      description: 'সিলেটে চা বাগানে ২০ লক্ষ টাকা বিনিয়োগের প্রস্তাব',
      deadline: '2024-08-20',
      status: 'active',
      yesVotes: 12,
      noVotes: 3,
      totalVotes: 15,
      totalMembers: 23,
      userVoted: false
    },
    {
      id: '2',
      title: 'মাসিক অবদান বৃদ্ধি',
      description: 'মাসিক অবদান ১০,০০০ থেকে ১২,০০০ টাকা করার প্রস্তাব',
      deadline: '2024-07-25',
      status: 'completed',
      yesVotes: 8,
      noVotes: 15,
      totalVotes: 23,
      totalMembers: 23,
      result: 'rejected',
      userVoted: true
    }
  ]);

  const handleAddVote = (newVote: any) => {
    setVotes([...votes, newVote]);
  };

  const handleVote = (voteId: string, voteType: 'yes' | 'no') => {
    setVotes(prevVotes => 
      prevVotes.map(vote => {
        if (vote.id === voteId && vote.status === 'active' && !vote.userVoted) {
          const newVote = {
            ...vote,
            yesVotes: voteType === 'yes' ? vote.yesVotes + 1 : vote.yesVotes,
            noVotes: voteType === 'no' ? vote.noVotes + 1 : vote.noVotes,
            totalVotes: vote.totalVotes + 1,
            userVoted: true
          };
          
          toast({
            title: "ভোট সফল / Vote Successful",
            description: `আপনার ${voteType === 'yes' ? 'পক্ষের' : 'বিপক্ষের'} ভোট রেকর্ড করা হয়েছে / Your ${voteType === 'yes' ? 'yes' : 'no'} vote has been recorded`,
          });
          
          return newVote;
        }
        return vote;
      })
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'আসন্ন';
      case 'completed': return 'সম্পন্ন';
      case 'cancelled': return 'বাতিল';
      default: return status;
    }
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('meetings')}</h1>
        {isAdmin && (
          <div className="flex gap-2">
            <AddMeetingDialog onAddMeeting={handleAddMeeting} />
            <AddVoteDialog onAddVote={handleAddVote} />
          </div>
        )}
      </div>

      {/* Meetings Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">সভাসমূহ</h2>
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{meeting.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
                </div>
                <Badge className={getStatusColor(meeting.status)}>
                  {getStatusText(meeting.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(meeting.date).toLocaleDateString('bn-BD')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {meeting.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {meeting.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  উপস্থিতি: {meeting.attendees}/{meeting.totalMembers} সদস্য
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voting Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Vote className="h-5 w-5" />
          ভোটিং / Voting
        </h2>
        {votes.map((vote) => (
          <Card key={vote.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{vote.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{vote.description}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={vote.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {vote.status === 'active' ? 'সক্রিয়' : 'সম্পন্ন'}
                  </Badge>
                  {vote.userVoted && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      ভোট দিয়েছেন
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  শেষ তারিখ: {new Date(vote.deadline).toLocaleDateString('bn-BD')}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="text-sm">পক্ষে</span>
                    </div>
                    <span className="text-sm font-medium">{vote.yesVotes} ভোট</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(vote.yesVotes / vote.totalMembers) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <XCircle className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm">বিপক্ষে</span>
                    </div>
                    <span className="text-sm font-medium">{vote.noVotes} ভোট</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(vote.noVotes / vote.totalMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-gray-600">
                    মোট ভোট: {vote.totalVotes}/{vote.totalMembers}
                  </span>
                  {vote.status === 'active' && !vote.userVoted && (
                    <div className="space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                        onClick={() => handleVote(vote.id, 'yes')}
                      >
                        পক্ষে
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleVote(vote.id, 'no')}
                      >
                        বিপক্ষে
                      </Button>
                    </div>
                  )}
                  {vote.userVoted && vote.status === 'active' && (
                    <span className="text-sm text-blue-600 font-medium">
                      আপনার ভোট রেকর্ড করা হয়েছে
                    </span>
                  )}
                  {vote.result && (
                    <Badge className={vote.result === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}>
                      {vote.result === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Meetings;
