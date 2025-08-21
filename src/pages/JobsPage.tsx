import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, DollarSign, Building, User, Plus, X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const JobsPage: React.FC = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Form states
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isJobPostingOpen, setIsJobPostingOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    experienceYears: '',
    expectedSalary: '',
    availableDate: '',
    resumeFile: null as File | null,
    message: ''
  });
  
  // Job posting form state
  const [jobPostingForm, setJobPostingForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    category: 'technology',
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    remote: false,
    urgent: false
  });

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'technology', name: 'Technology' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'retail', name: 'Retail' },
    { id: 'construction', name: 'Construction' },
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' }
  ];

  const jobTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'full-time', name: 'Full-time' },
    { id: 'part-time', name: 'Part-time' },
    { id: 'contract', name: 'Contract' },
    { id: 'freelance', name: 'Freelance' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Skills Training Center',
      location: 'Kigali',
      type: 'part-time',
      category: 'technology',
      salary: '$25/hour',
      description: 'Build responsive web applications using React and modern web technologies. Perfect for someone looking to gain experience in a supportive environment.',
      requirements: ['React experience', 'HTML/CSS proficiency', 'Basic JavaScript knowledge'],
      benefits: ['Flexible hours', 'Skill development', 'Mentorship'],
      postedDate: '2024-01-12',
      applicants: 8,
      remote: true,
      urgent: false
    },
    {
      id: 2,
      title: 'Farm Operations Assistant',
      company: 'Urban Farming Initiative',
      location: 'Kigali',
      type: 'full-time',
      category: 'agriculture',
      salary: '$18/hour',
      description: 'Support daily operations of vertical farming facility including planting, harvesting, and system maintenance.',
      requirements: ['Physical fitness', 'Attention to detail', 'Willingness to learn'],
      benefits: ['Health insurance', 'Training provided', 'Career growth'],
      postedDate: '2024-01-10',
      applicants: 15,
      remote: false,
      urgent: true
    },
    {
      id: 3,
      title: 'Sales Associate',
      company: 'Community Marketplace',
      location: 'Kigali',
      type: 'part-time',
      category: 'retail',
      salary: '$16/hour + commission',
      description: 'Help customers discover local artisan products and provide excellent customer service in our community marketplace.',
      requirements: ['Customer service skills', 'Local language fluency', 'Sales experience preferred'],
      benefits: ['Commission bonuses', 'Product discounts', 'Flexible schedule'],
      postedDate: '2024-01-08',
      applicants: 22,
      remote: false,
      urgent: false
    },
    {
      id: 4,
      title: 'Solar Panel Installer',
      company: 'Solar Manufacturing Co.',
      location: 'Huye',
      type: 'full-time',
      category: 'construction',
      salary: '$22/hour',
      description: 'Install solar panel systems for residential and commercial properties. Training provided for the right candidate.',
      requirements: ['Physical fitness', 'Basic electrical knowledge', 'Valid drivers license'],
      benefits: ['Health insurance', 'Training certification', 'Travel allowance'],
      postedDate: '2024-01-05',
      applicants: 12,
      remote: false,
      urgent: true
    },
    {
      id: 5,
      title: 'Community Health Worker',
      company: 'Mobile Clinic Service',
      location: 'Musanze',
      type: 'contract',
      category: 'healthcare',
      salary: '$20/hour',
      description: 'Provide basic healthcare services and health education to rural communities through our mobile clinic program.',
      requirements: ['Healthcare background', 'Community engagement experience', 'Multilingual preferred'],
      benefits: ['Meaningful impact', 'Professional development', 'Travel opportunities'],
      postedDate: '2024-01-03',
      applicants: 6,
      remote: false,
      urgent: false
    },
    {
      id: 6,
      title: 'Digital Marketing Specialist',
      company: 'Organic Coffee Cooperative',
      location: 'Remote',
      type: 'freelance',
      category: 'technology',
      salary: '$30/hour',
      description: 'Develop and execute digital marketing strategies to promote our organic coffee brand internationally.',
      requirements: ['Digital marketing experience', 'Social media expertise', 'Content creation skills'],
      benefits: ['Remote work', 'International exposure', 'Performance bonuses'],
      postedDate: '2024-01-01',
      applicants: 18,
      remote: true,
      urgent: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'freelance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  // Form handlers
  const openApplication = (job: any) => {
    if (!user) {
      alert('Please sign in to apply for jobs');
      return;
    }
    setSelectedJob(job);
    setIsApplicationOpen(true);
  };

  const closeApplication = () => {
    setIsApplicationOpen(false);
    setSelectedJob(null);
  };

  const openJobPosting = () => {
    if (!user) {
      alert('Please sign in to post a job');
      return;
    }
    setIsJobPostingOpen(true);
  };

  const closeJobPosting = () => {
    setIsJobPostingOpen(false);
    setJobPostingForm({
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      category: 'technology',
      salary: '',
      description: '',
      requirements: [''],
      benefits: [''],
      remote: false,
      urgent: false
    });
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', { job: selectedJob, ...applicationForm });
    closeApplication();
  };

  const handleJobPostingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posted:', jobPostingForm);
    closeJobPosting();
  };

  const addRequirement = () => {
    setJobPostingForm({
      ...jobPostingForm,
      requirements: [...jobPostingForm.requirements, '']
    });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = jobPostingForm.requirements.filter((_, i) => i !== index);
    setJobPostingForm({
      ...jobPostingForm,
      requirements: newRequirements
    });
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...jobPostingForm.requirements];
    newRequirements[index] = value;
    setJobPostingForm({
      ...jobPostingForm,
      requirements: newRequirements
    });
  };

  const addBenefit = () => {
    setJobPostingForm({
      ...jobPostingForm,
      benefits: [...jobPostingForm.benefits, '']
    });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = jobPostingForm.benefits.filter((_, i) => i !== index);
    setJobPostingForm({
      ...jobPostingForm,
      benefits: newBenefits
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...jobPostingForm.benefits];
    newBenefits[index] = value;
    setJobPostingForm({
      ...jobPostingForm,
      benefits: newBenefits
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Please sign in to view job opportunities</h2>
          <p className="text-slate-600 mb-6">Sign in to browse jobs, apply for positions, and post new opportunities</p>
          <div className="space-x-4">
            <Link to="/signin" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Sign In
            </Link>
            <Link to="/signin" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Job Application Stats - moved to top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="text-3xl font-bold text-blue-700 mb-2">{filteredJobs.length}</div>
          <div className="text-blue-600">Available Positions</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="text-3xl font-bold text-green-700 mb-2">85%</div>
          <div className="text-green-600">Success Rate</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
          <div className="text-3xl font-bold text-yellow-700 mb-2">$21</div>
          <div className="text-yellow-600">Average Hourly</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="text-3xl font-bold text-purple-700 mb-2">127</div>
          <div className="text-purple-600">Jobs This Month</div>
        </div>
      </motion.div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Job Opportunities</h1>
          <p className="text-slate-600">Find meaningful work in your community</p>
        </div>
        <button 
          onClick={openJobPosting}
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post a Job
        </button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-slate-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {jobTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Jobs List */}
      <div className="space-y-6">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 2) }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-800">{job.title}</h3>
                  {job.urgent && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Urgent
                    </span>
                  )}
                  {job.remote && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{job.description}</p>
              </div>
              <div className="text-right ml-6">
                <div className="text-2xl font-bold text-green-600 mb-2">{job.salary}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="font-medium text-slate-800 mb-2">Requirements:</h4>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req, reqIndex) => (
                  <span
                    key={reqIndex}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <h4 className="font-medium text-slate-800 mb-2">Benefits:</h4>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, benIndex) => (
                  <span
                    key={benIndex}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                <span>{job.applicants} applicants</span>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  Save Job
                </button>
                <button 
                  onClick={() => openApplication(job)}
                  className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No jobs found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Job Application Stats moved here from bottom */}
    </div>

    {/* Application Form Modal */}
    {isApplicationOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-900/50" onClick={closeApplication} />
        <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Job Application</h3>
              {selectedJob && (
                <p className="text-sm text-slate-600 mt-1">Applying for: <span className="font-medium">{selectedJob.title}</span> at {selectedJob.company}</p>
              )}
            </div>
            <button onClick={closeApplication} className="text-slate-600 hover:text-slate-800 px-2 py-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full name</label>
                <input
                  type="text"
                  value={applicationForm.fullName}
                  onChange={(e) => setApplicationForm({ ...applicationForm, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={applicationForm.email}
                  onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location (City, Country)</label>
                <input
                  type="text"
                  value={applicationForm.location}
                  onChange={(e) => setApplicationForm({ ...applicationForm, location: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Years of experience</label>
                <input
                  type="number"
                  min="0"
                  value={applicationForm.experienceYears}
                  onChange={(e) => setApplicationForm({ ...applicationForm, experienceYears: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expected salary (number)</label>
                <input
                  type="number"
                  min="0"
                  value={applicationForm.expectedSalary}
                  onChange={(e) => setApplicationForm({ ...applicationForm, expectedSalary: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Available from (mm/dd/yyyy)</label>
                <input
                  type="text"
                  value={applicationForm.availableDate}
                  onChange={(e) => setApplicationForm({ ...applicationForm, availableDate: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Resume (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setApplicationForm({ ...applicationForm, resumeFile: e.target.files && e.target.files[0] ? e.target.files[0] : null })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea
                rows={4}
                value={applicationForm.message}
                onChange={(e) => setApplicationForm({ ...applicationForm, message: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write a short message..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={closeApplication} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow">Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Job Posting Form Modal */}
    {isJobPostingOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-900/50" onClick={closeJobPosting} />
        <div className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Post a New Job</h3>
              <p className="text-slate-600 mt-1">Fill out the form below to post a new job opportunity</p>
            </div>
            <button onClick={closeJobPosting} className="text-slate-600 hover:text-slate-800 px-2 py-1 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleJobPostingSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={jobPostingForm.title}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={jobPostingForm.company}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, company: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={jobPostingForm.location}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, location: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Kigali, Rwanda"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Job Type *</label>
                <select
                  value={jobPostingForm.type}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, type: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                <select
                  value={jobPostingForm.category}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="technology">Technology</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="retail">Retail</option>
                  <option value="construction">Construction</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Salary/Compensation *</label>
                <input
                  type="text"
                  value={jobPostingForm.salary}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, salary: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. $25/hour or $50,000/year"
                  required
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Job Description *</label>
              <textarea
                rows={4}
                value={jobPostingForm.description}
                onChange={(e) => setJobPostingForm({ ...jobPostingForm, description: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Requirements</label>
              <div className="space-y-3">
                {jobPostingForm.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. React experience"
                    />
                    {jobPostingForm.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Requirement
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Benefits</label>
              <div className="space-y-3">
                {jobPostingForm.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g. Flexible hours"
                    />
                    {jobPostingForm.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBenefit}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Benefit
                </button>
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="remote"
                  checked={jobPostingForm.remote}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, remote: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remote" className="text-sm font-medium text-slate-700">
                  Remote work available
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={jobPostingForm.urgent}
                  onChange={(e) => setJobPostingForm({ ...jobPostingForm, urgent: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="urgent" className="text-sm font-medium text-slate-700">
                  Mark as urgent
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
              <button type="button" onClick={closeJobPosting} className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  );
};

export default JobsPage;