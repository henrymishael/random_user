"use client";

import { useState, useEffect } from "react";
import { UserCard } from "@/components/user-card";
import { Pagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, AlertCircle } from "lucide-react";
import { ApiResponse, User } from "@/interfaces";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: ApiResponse = await response.json();
      setUsers(data.results);

      setTotalPages(10);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>Error loading users: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <div className='flex items-center space-x-2 mb-2'>
          <Users className='w-8 h-8 text-primary' />
          <h1 className='text-3xl font-bold'>User Dashboard</h1>
        </div>
        <p className='text-muted-foreground'>
          Browse through our user directory with pagination
        </p>
      </div>

      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='space-y-4 p-6 border rounded-lg'>
              <div className='flex flex-col items-center space-y-4'>
                <Skeleton className='w-20 h-20 rounded-full' />
                <div className='space-y-2 w-full'>
                  <Skeleton className='h-4 w-3/4 mx-auto' />
                  <Skeleton className='h-3 w-full' />
                  <Skeleton className='h-3 w-2/3' />
                  <Skeleton className='h-3 w-3/4' />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
            {users.map((user) => (
              <UserCard key={user.login.uuid} user={user} />
            ))}
          </div>

          <div className='flex flex-col items-center space-y-4'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <p className='text-sm text-muted-foreground'>
              Page {currentPage} of {totalPages} • Showing 10 users per page
            </p>
          </div>
        </>
      )}
    </div>
  );
}
