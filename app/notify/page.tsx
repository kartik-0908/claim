'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock notification data
const notificationsData = [
  {
    id: 1,
    type: "claim_denial",
    title: "Claim #CL-2024-0156 Denied",
    message: "Claim for patient John Smith has been denied due to insufficient documentation.",
    payor: "BlueCross BlueShield",
    claimId: "CL-2024-0156",
    amount: "$485.00",
    timestamp: "2025-05-26T10:30:00Z",
    isRead: false,
    priority: "high"
  },
  {
    id: 2,
    type: "payment_discrepancy",
    title: "Payment Adjustment Required",
    message: "Payment for claim #CL-2024-0142 shows discrepancy of $45.20 from expected amount.",
    payor: "Aetna Healthcare",
    claimId: "CL-2024-0142",
    amount: "$245.20",
    expectedAmount: "$290.40",
    timestamp: "2025-05-26T08:15:00Z",
    isRead: false,
    priority: "medium"
  },
  {
    id: 3,
    type: "prior_authorization",
    title: "Prior Authorization Approved",
    message: "Prior authorization request for MRI scan has been approved for patient Sarah Johnson.",
    payor: "United Healthcare",
    authorizationId: "PA-2024-7891",
    patientName: "Sarah Johnson",
    timestamp: "2025-05-25T16:45:00Z",
    isRead: true,
    priority: "low"
  },
  {
    id: 4,
    type: "policy_update",
    title: "Coverage Policy Update",
    message: "New coverage guidelines for telehealth services effective June 1, 2025.",
    payor: "Medicare",
    effectiveDate: "2025-06-01",
    timestamp: "2025-05-25T14:20:00Z",
    isRead: true,
    priority: "medium"
  },
  {
    id: 5,
    type: "claim_denial",
    title: "Claim #CL-2024-0158 Denied",
    message: "Claim denied due to service not covered under current plan benefits.",
    payor: "Cigna Health",
    claimId: "CL-2024-0158",
    amount: "$320.00",
    timestamp: "2025-05-25T11:30:00Z",
    isRead: false,
    priority: "high"
  },
  {
    id: 6,
    type: "payment_received",
    title: "Payment Processed",
    message: "Payment of $1,245.67 has been processed for multiple claims.",
    payor: "Humana",
    amount: "$1,245.67",
    claimsCount: 5,
    timestamp: "2025-05-25T09:15:00Z",
    isRead: true,
    priority: "low"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "claim_denial":
        return "❌";
      case "payment_discrepancy":
        return "⚠️";
      case "prior_authorization":
        return "✅";
      case "policy_update":
        return "📋";
      case "payment_received":
        return "💰";
      default:
        return "📢";
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "high") return "border-l-red-500 bg-red-50";
    if (priority === "medium") return "border-l-yellow-500 bg-yellow-50";
    return "border-l-blue-500 bg-blue-50";
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return colors[priority] || colors.low;
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterType !== "all" && notif.type !== filterType) return false;
    if (showUnreadOnly && notif.isRead) return false;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Notifications</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with payor communications and claim updates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {unreadCount} Unread
          </span>
          <button
          type="button"
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Filters and Notifications List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Filter:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="claim_denial">Claim Denials</option>
                  <option value="payment_discrepancy">Payment Issues</option>
                  <option value="prior_authorization">Prior Auth</option>
                  <option value="policy_update">Policy Updates</option>
                  <option value="payment_received">Payments</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="rounded"
                />
                Show unread only
              </label>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  getNotificationColor(notification.type, notification.priority)
                } ${!notification.isRead ? 'font-medium' : 'opacity-75'}`}
                onClick={() => {
                  setSelectedNotification(notification);
                  markAsRead(notification.id);
                }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="font-medium">{notification.payor}</span>
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          <span className={`px-2 py-1 rounded ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notification Details */}
        <div className="bg-white rounded-lg border shadow-sm">
          {selectedNotification ? (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">
                  {getNotificationIcon(selectedNotification.type)}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedNotification.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedNotification.payor}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Message</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedNotification.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Priority:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${getPriorityBadge(selectedNotification.priority)}`}>
                      {selectedNotification.priority}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Time:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(selectedNotification.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                {selectedNotification.claimId && (
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Claim Details</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-medium">Claim ID:</span>
                        <span className="ml-2">{selectedNotification.claimId}</span>
                      </div>
                      {selectedNotification.amount && (
                        <div>
                          <span className="font-medium">Amount:</span>
                          <span className="ml-2 font-mono">{selectedNotification.amount}</span>
                        </div>
                      )}
                      {selectedNotification.expectedAmount && (
                        <div>
                          <span className="font-medium">Expected:</span>
                          <span className="ml-2 font-mono">{selectedNotification.expectedAmount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                    Take Action
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <div className="text-4xl mb-4">📋</div>
              <p>Select a notification to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}