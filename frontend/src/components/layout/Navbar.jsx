import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users } from "lucide-react";

const Navbar = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications");
      return res.data;
    },
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/connections/requests");
      return res.data;
    },
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      // Immediately set authUser to null so the app re-routes to /login
      queryClient.setQueryData(["authUser"], null);
      queryClient.clear();
    },
  });

  const unreadNotificationCount = notifications?.filter(
    (notif) => !notif.read
  ).length;

  const unreadConnectionRequestsCount = connectionRequests?.length;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-8 rounded"
                src="/small-logo.png"
                alt="LinkedIn"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {authUser ? (
              <>
                <Link
                  to="/"
                  className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition"
                >
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>

                <Link
                  to="/network"
                  className="flex flex-col items-center relative text-gray-600 hover:text-gray-900 transition"
                >
                  <Users size={20} />
                  <span className="text-xs hidden md:block">My Network</span>

                  {unreadConnectionRequestsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-blue-600 text-white text-[10px] 
                      rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center"
                    >
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/notifications"
                  className="flex flex-col items-center relative text-gray-600 hover:text-gray-900 transition"
                >
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Notifications</span>

                  {unreadNotificationCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-blue-600 text-white text-[10px] 
                      rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center"
                    >
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>

                <Link
                  to={`/profile/${authUser.username}`}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition"
                >
                  <User size={20} />
                  <span className="text-xs hidden md:block">Me</span>
                </Link>

                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
