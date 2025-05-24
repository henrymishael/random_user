import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, UserIcon } from "lucide-react";
import { User } from "@/interfaces";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGenderColor = (gender: string) => {
    return gender === "male"
      ? "bg-blue-100 text-blue-800"
      : "bg-pink-100 text-pink-800";
  };

  return (
    <Card className='h-full hover:shadow-lg transition-shadow duration-200'>
      <CardContent className='p-6'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='relative'>
            <Avatar className='w-20 h-20'>
              <AvatarImage
                src={user.picture.large || "/placeholder.svg"}
                alt={`${user.name.first} ${user.name.last}`}
                className='object-cover'
              />
              <AvatarFallback className='text-lg'>
                {user.name.first[0]}
                {user.name.last[0]}
              </AvatarFallback>
            </Avatar>
            <Badge
              className={`absolute -bottom-1 -right-1 text-xs ${getGenderColor(
                user.gender
              )}`}
              variant='secondary'
            >
              <UserIcon className='w-3 h-3 mr-1' />
              {user.gender}
            </Badge>
          </div>

          <div className='text-center space-y-1'>
            <h3 className='font-semibold text-lg'>
              {user.name.title} {user.name.first} {user.name.last}
            </h3>
          </div>

          <div className='w-full space-y-3'>
            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <Mail className='w-4 h-4 flex-shrink-0' />
              <span className='truncate'>{user.email}</span>
            </div>

            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <Phone className='w-4 h-4 flex-shrink-0' />
              <span>{user.phone}</span>
            </div>

            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <Calendar className='w-4 h-4 flex-shrink-0' />
              <span>
                Born {formatDate(user.dob.date)} (Age {user.dob.age})
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
