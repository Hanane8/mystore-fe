import { useState, useEffect } from "react";
import { 
  UserCircle, Mail, Phone, MapPin, PenLine, Save, 
  ShieldCheck, History, Bell, Camera, X, Check,
  Calendar, Building, Globe
} from "lucide-react";
import api from "../Services/api";

const MyProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    company: "",
    website: "",
    joinDate: "",
    lastLogin: "",
    notificationsEnabled: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`/api/User/${userId}`);

        if (response.data.isSuccessfull) {
          const userData = response.data.data;
          setUser({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            address: userData.address || "",
            phone: userData.phone || "Not provided",
            joinDate: userData.joinDate || new Date().toISOString(),
            lastLogin: userData.lastLogin || new Date().toISOString(),
            notificationsEnabled: userData.notificationsEnabled ?? true
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ 
      ...user, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found.");
      }

      setSaveStatus({ show: true, success: false });
      const response = await api.put(`/api/User/${userId}/update`, user);

      if (response.data.isSuccessfull) {
        setSaveStatus({ show: true, success: true });
        setIsEditing(false);
        setTimeout(() => setSaveStatus({ show: false, success: false }), 3000);
      } else {
        throw new Error(response.data.errorMessage);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveStatus({ show: true, success: false });
      setTimeout(() => setSaveStatus({ show: false, success: false }), 3000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Save Status Notification */}
      {saveStatus.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-xl shadow-lg flex items-center gap-2 transform transition-all duration-500 ${
          saveStatus.success ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {saveStatus.success ? (
            <Check className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
          <span>
            {saveStatus.success
              ? 'Profile updated successfully!'
              : 'Failed to update profile'}
          </span>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-4xl shadow-soft mb-8 p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                <UserCircle className="w-24 h-24 text-primary-400" />
              </div>
              <button
                onClick={() => setShowImageUpload(true)}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition-colors"
              >
                <Camera className="w-5 h-5 text-primary-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-secondary-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(user.joinDate)}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                isEditing
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              ) : (
                <>
                  <PenLine className="w-5 h-5" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-4xl shadow-soft overflow-hidden">
          <div className="border-b border-secondary-100">
            <div className="flex">
              {['profile', 'security', 'notifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-secondary-600 hover:text-primary-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-fade-in">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-6">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-50 disabled:text-secondary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-50 disabled:text-secondary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Company
                      </label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                        <input
                          type="text"
                          name="company"
                          value={user.company}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-50 disabled:text-secondary-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Website
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                        <input
                          type="url"
                          name="website"
                          value={user.website}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-50 disabled:text-secondary-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          disabled
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 bg-secondary-50 text-secondary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-50 disabled:text-secondary-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                        <input
                          type="text"
                          name="address"
                          value={user.address}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-50 disabled:text-secondary-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between p-6 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary-100 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-secondary-900">Two-Factor Authentication</h4>
                      <p className="text-secondary-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary-100 rounded-xl">
                      <History className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-secondary-900">Login History</h4>
                      <p className="text-secondary-600">Last login: {formatDate(user.lastLogin)}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition-colors">
                    View All
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between p-6 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary-100 rounded-xl">
                      <Bell className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-secondary-900">Email Notifications</h4>
                      <p className="text-secondary-600">Receive updates about your account</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notificationsEnabled"
                      checked={user.notificationsEnabled}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Profile Picture</h3>
              <button
                onClick={() => setShowImageUpload(false)}
                className="p-2 hover:bg-secondary-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-secondary-200 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
              <p className="text-secondary-600 mb-4">
                Drag and drop your image here, or click to select a file
              </p>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;