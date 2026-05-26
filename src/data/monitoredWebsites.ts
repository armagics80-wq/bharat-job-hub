export interface MonitoredWebsite {
  id: string;
  name: string;
  url: string;
  category: string;
  department: string;
}

export const MONITORED_WEBSITES: MonitoredWebsite[] = [
  // --- ANDHRA PRADESH GOVERNMENT WEBSITES ---
  { id: 'ap-portal', name: 'AP State Government Portal', url: 'https://ap.gov.in', category: 'Andhra Pradesh', department: 'Main State Portal' },
  { id: 'ap-home', name: 'AP Government Home', url: 'https://ap.gov.in/ap', category: 'Andhra Pradesh', department: 'Main State Portal' },
  { id: 'ap-cmo', name: 'AP Chief Minister Office', url: 'https://cm.ap.gov.in', category: 'Andhra Pradesh', department: 'Administration' },
  { id: 'ap-online', name: 'AP Online Services Portal', url: 'https://aponline.gov.in', category: 'Andhra Pradesh', department: 'E-Governance' },
  { id: 'ap-sspb', name: 'AP Service Selection Board', url: 'https://www.apsspb.org', category: 'Andhra Pradesh', department: 'Recruitment Board' },
  { id: 'ap-psc', name: 'AP Public Service Commission', url: 'https://www.apssc.gov.in', category: 'Andhra Pradesh', department: 'Recruitment Board' },
  { id: 'ap-forest-comm', name: 'AP Forest Commission', url: 'https://www.apfc.gov.in', category: 'Andhra Pradesh', department: 'Recruitment Board' },
  { id: 'ap-transco', name: 'AP Transmission Corporation Ltd', url: 'https://www.aptransco.co.in', category: 'Andhra Pradesh', department: 'Power Sector' },
  { id: 'ap-genco', name: 'Andhra Pradesh Genco', url: 'https://www.apgenco.gov.in', category: 'Andhra Pradesh', department: 'Power Sector' },
  { id: 'ap-mrb', name: 'AP Municipal Recruitment Board', url: 'https://www.apmrb.gov.in', category: 'Andhra Pradesh', department: 'Recruitment Board' },
  { id: 'ap-police', name: 'AP Police Department', url: 'https://www.appolice.gov.in', category: 'Andhra Pradesh', department: 'Police & Security' },
  { id: 'ap-careers', name: 'AP Careers Portal', url: 'https://www.apcareers.in', category: 'Andhra Pradesh', department: 'Employment Services' },
  { id: 'ap-job-alert', name: 'AP Job Alerts Direct', url: 'https://www.apjobalert.com', category: 'Andhra Pradesh', department: 'Employment Services' },
  { id: 'ap-jobs-port', name: 'AP Jobs Portal', url: 'https://www.apjobs.com', category: 'Andhra Pradesh', department: 'Employment Services' },
  { id: 'ap-edu-cse', name: 'AP Council of School Education', url: 'https://cse.ap.gov.in', category: 'Andhra Pradesh', department: 'Education Department' },
  { id: 'ap-edu-ssc', name: 'AP Secondary School Certificate Board', url: 'https://ssc.ap.gov.in', category: 'Andhra Pradesh', department: 'Education Department' },
  { id: 'ap-edu-bie', name: 'AP Board of Intermediate Education', url: 'https://bie.ap.gov.in', category: 'Andhra Pradesh', department: 'Education Department' },
  { id: 'ap-edu-dte', name: 'AP Directorate of Technical Education', url: 'https://dte.ap.gov.in', category: 'Andhra Pradesh', department: 'Education Department' },
  { id: 'ap-edu-samagra', name: 'AP Samagra Education Portal', url: 'https://samagra.ap.gov.in', category: 'Andhra Pradesh', department: 'Education Department' },
  { id: 'ap-edu-soe', name: 'AP School of Excellence', url: 'https://schoolofexcellence.ap.gov.in', category: 'Andhra Pradesh', department: 'Education Department' },
  { id: 'ap-health-cfw', name: 'AP Central Facilitation Website', url: 'https://cfw.ap.nic.in', category: 'Andhra Pradesh', department: 'Health Department' },
  { id: 'ap-health-dept', name: 'AP Health Department', url: 'https://health.ap.gov.in', category: 'Andhra Pradesh', department: 'Health Department' },
  { id: 'ap-greetings', name: 'AP E-Greetings Health Services', url: 'https://egreetings.ap.gov.in', category: 'Andhra Pradesh', department: 'Health Department' },
  { id: 'ap-vvp', name: 'AP Vaidya Vidhana Parishad (Medical Board)', url: 'https://egreetings.ap.gov.in/ApVaidyaVidhanaParishad', category: 'Andhra Pradesh', department: 'Health Department' },
  { id: 'ap-agri', name: 'AP Agriculture Department', url: 'https://agriculture.ap.gov.in', category: 'Andhra Pradesh', department: 'Agriculture Department' },
  { id: 'ap-agri-learn', name: 'AP Agricultural Learning Portal', url: 'https://agrilearn.ap.gov.in', category: 'Andhra Pradesh', department: 'Agriculture Department' },
  { id: 'ap-angrau', name: 'ANGRAU Agri University', url: 'https://www.angrau.ac.in', category: 'Andhra Pradesh', department: 'Agriculture Department' },
  { id: 'ap-marketing-board', name: 'AP Agricultural Marketing Board', url: 'https://www.apmab.gov.in', category: 'Andhra Pradesh', department: 'Agriculture Department' },
  { id: 'ap-cdma', name: 'AP Town Planning Commission', url: 'https://cdma.ap.gov.in', category: 'Andhra Pradesh', department: 'Housing & Urban Development' },
  { id: 'ap-apiic', name: 'AP Industries Infrastructure Corp', url: 'https://apiic.in', category: 'Andhra Pradesh', department: 'Housing & Urban Development' },
  { id: 'ap-finance', name: 'AP Finance Department', url: 'https://finance.ap.gov.in', category: 'Andhra Pradesh', department: 'Finance & Commerce' },
  { id: 'ap-comm-tax', name: 'AP Commercial Tax Board', url: 'https://commercialtax.ap.gov.in', category: 'Andhra Pradesh', department: 'Finance & Commerce' },
  { id: 'ap-org-dept', name: 'AP Organization Department', url: 'https://www.apod.gov.in', category: 'Andhra Pradesh', department: 'Finance & Commerce' },
  { id: 'ap-yjeap', name: 'AP Young Entrepreneur Program', url: 'https://apyjeap.in', category: 'Andhra Pradesh', department: 'Finance & Commerce' },
  { id: 'ap-revenue', name: 'AP Revenue Department', url: 'https://revenue.ap.gov.in', category: 'Andhra Pradesh', department: 'Revenue & Land Records' },
  { id: 'ap-registration', name: 'AP Registration Department', url: 'https://registration.ap.gov.in', category: 'Andhra Pradesh', department: 'Revenue & Land Records' },
  { id: 'ap-land', name: 'AP Land Records Portal', url: 'https://www.apland.gov.in', category: 'Andhra Pradesh', department: 'Revenue & Land Records' },
  { id: 'ap-dharani', name: 'AP Dharani Land Portal', url: 'https://dharani.ap.gov.in', category: 'Andhra Pradesh', department: 'Revenue & Land Records' },
  { id: 'ap-panchayat', name: 'AP Panchayat Raj Department', url: 'https://pr.ap.gov.in', category: 'Andhra Pradesh', department: 'Rural Development' },
  { id: 'ap-nrega', name: 'AP MGNREGA Job Services', url: 'https://www.apnrega.in', category: 'Andhra Pradesh', department: 'Rural Development' },
  { id: 'ap-serp', name: 'AP SERP Employment Services', url: 'https://www.serp.ap.gov.in', category: 'Andhra Pradesh', department: 'Rural Development' },
  { id: 'ap-sesp', name: 'AP SESP Skills Development', url: 'https://www.sesp.ap.gov.in', category: 'Andhra Pradesh', department: 'Rural Development' },
  { id: 'ap-crime', name: 'AP Crime Records Portal', url: 'https://checkapcrime.appolice.gov.in', category: 'Andhra Pradesh', department: 'Police & Security' },
  { id: 'ap-myhakka', name: 'AP MyHakka Services', url: 'https://www.myhakka.ap.gov.in', category: 'Andhra Pradesh', department: 'Police & Security' },
  { id: 'ap-forest', name: 'AP Forest Department', url: 'https://forest.ap.gov.in', category: 'Andhra Pradesh', department: 'Forest & Environment' },
  { id: 'ap-transport', name: 'AP Transport Department', url: 'https://transport.ap.gov.in', category: 'Andhra Pradesh', department: 'Transport & Infrastructure' },
  { id: 'ap-rtc', name: 'AP State Road Transport Corp', url: 'https://www.apsrtc.ap.gov.in', category: 'Andhra Pradesh', department: 'Transport & Infrastructure' },
  { id: 'ap-welfare', name: 'AP Social Welfare Board', url: 'https://socialwelfare.apcfss.in', category: 'Andhra Pradesh', department: 'Welfare Schemes' },
  { id: 'ap-civil-supplies', name: 'AP Civil Supplies Department', url: 'https://civilsupplies.ap.gov.in', category: 'Andhra Pradesh', department: 'Welfare Schemes' },
  { id: 'ap-perc', name: 'AP Electricity Regulatory Commission', url: 'https://www.aperc.gov.in', category: 'Andhra Pradesh', department: 'Welfare Schemes' },
  { id: 'ap-ports', name: 'AP Ports Authority', url: 'https://ports.ap.gov.in', category: 'Andhra Pradesh', department: 'Transport & Infrastructure' },
  { id: 'ap-gazette', name: 'AP Official Gazette Notifications', url: 'https://www.aponline.gov.in/ap-gazette', category: 'Andhra Pradesh', department: 'Government Gazettes' },
  { id: 'ap-acts', name: 'AP Acts & Law Portal', url: 'https://www.aponline.gov.in/ap-acts', category: 'Andhra Pradesh', department: 'Government Gazettes' },
  { id: 'ap-legislation', name: 'AP Legislation Portal', url: 'https://www.aponline.gov.in/ap-legislation', category: 'Andhra Pradesh', department: 'Government Gazettes' },
  { id: 'ap-sec', name: 'AP State Election Commission', url: 'https://sec.ap.gov.in', category: 'Andhra Pradesh', department: 'Administration' },

  // --- TELANGANA GOVERNMENT WEBSITES ---
  { id: 'tg-portal', name: 'TS Government Main Portal', url: 'https://www.telangana.gov.in', category: 'Telangana', department: 'Main State Portal' },
  { id: 'tg-home', name: 'TS Government Telugu Home', url: 'https://www.telangana.gov.in/te/home/20-2/', category: 'Telangana', department: 'Main State Portal' },
  { id: 'tg-depts', name: 'TS All Departments Index', url: 'https://www.telangana.gov.in/te/departments/', category: 'Telangana', department: 'Main State Portal' },
  { id: 'tg-cmo', name: 'TS Chief Minister Office', url: 'https://cm.telangana.gov.in', category: 'Telangana', department: 'Administration' },
  { id: 'tg-hyd-municip', name: 'TS Hyderabad District Portal', url: 'https://hyderabad.telangana.gov.in', category: 'Telangana', department: 'Housing & Urban Development' },
  { id: 'tg-psc', name: 'Telangana State PSC Official', url: 'https://www.tgpsc.gov.in', category: 'Telangana', department: 'Recruitment Board' },
  { id: 'tg-psc-new', name: 'New TG PSC Portal', url: 'https://websitenew.tgpsc.gov.in', category: 'Telangana', department: 'Recruitment Board' },
  { id: 'tg-psc-notif', name: 'TGPSC Active Notifications', url: 'https://websitenew.tgpsc.gov.in/notifications', category: 'Telangana', department: 'Recruitment Board' },
  { id: 'tg-psc-direct', name: 'TGPSC Direct Recruitment Listings', url: 'https://websitenew.tgpsc.gov.in/directRecruitment', category: 'Telangana', department: 'Recruitment Board' },
  { id: 'tg-dsc', name: 'TG DSC Teacher Recruitment', url: 'https://tgdsc.aptonline.in', category: 'Telangana', department: 'Recruitment Board' },
  { id: 'tg-pcb', name: 'TS Pollution Control Board', url: 'https://www.tspcb.gov.in', category: 'Telangana', department: 'Welfare Schemes' },
  { id: 'tg-health-comm', name: 'TS Chief Health Commissioner', url: 'https://www.tgchc.gov.in', category: 'Telangana', department: 'Health Department' },
  { id: 'tg-health-sch', name: 'TS State Health Commission', url: 'https://tshc.gov.in', category: 'Telangana', department: 'Health Department' },
  { id: 'tg-ceo', name: 'CEO Telangana Election Board', url: 'https://ceotelangana.nic.in', category: 'Telangana', department: 'Administration' },
  { id: 'tg-ssa', name: 'TS Sarva Shiksha Abhiyan', url: 'http://ssa.tg.nic.in', category: 'Telangana', department: 'Education Department' },
  { id: 'tg-edu-bie', name: 'TS Board of Intermediate Education', url: 'http://bie.telangana.gov.in', category: 'Telangana', department: 'Education Department' },
  { id: 'tg-edu-dte', name: 'TS Directorate of Technical Education', url: 'http://dte.telangana.gov.in', category: 'Telangana', department: 'Education Department' },
  { id: 'tg-edu-bse', name: 'TS Board of Secondary Education', url: 'http://bse.telangana.gov.in', category: 'Telangana', department: 'Education Department' },
  { id: 'tg-edu-tsche', name: 'TS Council of Higher Education', url: 'http://tsche.ac.in', category: 'Telangana', department: 'Education Department' },
  { id: 'tg-health-cfw', name: 'TS Health Facilitation Portal', url: 'https://cfw.tg.nic.in', category: 'Telangana', department: 'Health Department' },
  { id: 'tg-health-sch-rajiv', name: 'TS Rajiv Aarogyasri Scheme', url: 'https://rajivaarogyasri.telangana.gov.in', category: 'Telangana', department: 'Health Department' },
  { id: 'tg-health-sch-asri', name: 'TS Arogyasri Health Scheme', url: 'https://www.aarogyasri.telangana.gov.in', category: 'Telangana', department: 'Health Department' },
  { id: 'tg-health-ehf', name: 'TS Employee Health Fund', url: 'https://www.ehf.telangana.gov.in', category: 'Telangana', department: 'Health Department' },
  { id: 'tg-agri', name: 'TS Agriculture Department', url: 'https://agri.telangana.gov.in', category: 'Telangana', department: 'Agriculture Department' },
  { id: 'tg-agri-mktg', name: 'TS Agricultural Marketing Council', url: 'http://agrimarketing.telangana.gov.in/', category: 'Telangana', department: 'Agriculture Department' },
  { id: 'tg-agri-snet', name: 'TS Agrisnet Services Net', url: 'http://agrisnet.tg.nic.in/', category: 'Telangana', department: 'Agriculture Department' },
  { id: 'tg-housing-cgg', name: 'TS Housing Department Portal', url: 'http://tshousing.cgg.gov.in', category: 'Telangana', department: 'Housing & Urban Development' },
  { id: 'tg-housing-board', name: 'TS Housing Board', url: 'http://hb.telangana.gov.in', category: 'Telangana', department: 'Housing & Urban Development' },
  { id: 'tg-cdma', name: 'TS Town Development Directorate', url: 'http://cdma.telangana.gov.in', category: 'Telangana', department: 'Housing & Urban Development' },
  { id: 'tg-cdma-portal', name: 'TS CDMA Main Portal', url: 'https://www.cdma.telangana.gov.in', category: 'Telangana', department: 'Housing & Urban Development' },
  { id: 'tg-ghmc', name: 'Greater Hyderabad Municipal Corp', url: 'https://www.ghmc.gov.in/', category: 'Telangana', department: 'Housing & Urban Development' },
  { id: 'tg-finance', name: 'TS Finance Department', url: 'http://finance.telangana.gov.in', category: 'Telangana', department: 'Finance & Taxes' },
  { id: 'tg-treasury', name: 'TS Treasury Treasury Department', url: 'http://treasury.telangana.gov.in', category: 'Telangana', department: 'Finance & Taxes' },
  { id: 'tg-ct', name: 'TS Commercial Taxes Portal', url: 'https://www.tgct.gov.in/tgportal', category: 'Telangana', department: 'Finance & Taxes' },
  { id: 'tg-registration', name: 'TS Registration Department', url: 'http://registration.telangana.gov.in', category: 'Telangana', department: 'Revenue & Land' },
  { id: 'tg-webland', name: 'TS Webland Records Portal', url: 'http://webland.telangana.gov.in', category: 'Telangana', department: 'Revenue & Land' },
  { id: 'tg-ubdmis', name: 'TS Land Info MIS System', url: 'http://ubdmis.telangana.gov.in', category: 'Telangana', department: 'Revenue & Land' },
  { id: 'tg-panchayat', name: 'TS Panchayat Raj Portal', url: 'http://tspri.cgg.gov.in', category: 'Telangana', department: 'Rural Development' },
  { id: 'tg-nrega', name: 'TS NREGA Employment Portal', url: 'http://www.nrega.telangana.gov.in', category: 'Telangana', department: 'Rural Development' },
  { id: 'tg-iwmp', name: 'TS Water Management Portal', url: 'http://www.iwmp.telangana.gov.in', category: 'Telangana', department: 'Rural Development' },
  { id: 'tg-serp', name: 'TS SERP Skill Development', url: 'http://www.serp.telangana.gov.in', category: 'Telangana', department: 'Rural Development' },
  { id: 'tg-mepma', name: 'TS Employment Program MEPMA', url: 'http://www.tmepma.cgg.gov.in/', category: 'Telangana', department: 'Rural Development' },
  { id: 'tg-innovative-jobs', name: 'TS Innovation Jobs Board', url: 'http://ijp.telangana.gov.in', category: 'Telangana', department: 'Rural Development' },
  { id: 'tg-industries', name: 'TS Industries Department', url: 'http://industries.telangana.gov.in', category: 'Telangana', department: 'Industries & IT' },
  { id: 'tg-apiic', name: 'TS Industrial Infrastructure Corp', url: 'https://telangana.apiic.in', category: 'Telangana', department: 'Industries & IT' },
  { id: 'tg-it', name: 'TS Information Technology Dept', url: 'http://it.telangana.gov.in', category: 'Telangana', department: 'Industries & IT' },
  { id: 'tg-epass', name: 'TS E-Pass Services Portal', url: 'https://telanganaepass.cgg.gov.in', category: 'Telangana', department: 'Industries & IT' },
  { id: 'tg-transport', name: 'TS Transport Department', url: 'http://transport.telangana.gov.in', category: 'Telangana', department: 'Transport & Infrastructure' },
  { id: 'tg-genco', name: 'TS Genco Power Generation', url: 'https://tsgenco.telangana.gov.in', category: 'Telangana', department: 'Transport & Infrastructure' },
  { id: 'tg-police', name: 'TS Police Main Website', url: 'https://www.tspolice.gov.in', category: 'Telangana', department: 'Police & Security' },
  { id: 'tg-hyd-police', name: 'Hyderabad Police Portal', url: 'http://www.hyderabadpolice.gov.in', category: 'Telangana', department: 'Police & Security' },
  { id: 'tg-tourism', name: 'TS Tourism Department', url: 'http://www.telanganatourism.gov.in', category: 'Telangana', department: 'Tourism & Culture' },
  { id: 'tg-forests', name: 'TS Forest Department', url: 'https://forests.telangana.gov.in', category: 'Telangana', department: 'Forest & Environment' },
  { id: 'tg-aasara', name: 'TS Aasara Social Security', url: 'http://www.aasara.telangana.gov.in', category: 'Telangana', department: 'Welfare Schemes' },
  { id: 'tg-bangarutalli', name: 'TS Bangarutalli Welfare Portal', url: 'http://www.bangarutalli.telangana.gov.in', category: 'Telangana', department: 'Welfare Schemes' },
  { id: 'tg-sadarem', name: 'TS Disability Support (SADAREM)', url: 'http://sadarem.telangana.gov.in', category: 'Telangana', department: 'Welfare Schemes' },
  { id: 'tg-ikppwd', name: 'TS PWD Support Services', url: 'http://ikppwd.telangana.gov.in', category: 'Telangana', department: 'Welfare Schemes' },
  { id: 'tg-goir', name: 'TS Government Orders Register', url: 'http://goir.telangana.gov.in', category: 'Telangana', department: 'Government Orders & Gazette' },
  { id: 'tg-gazette', name: 'TS Official Gazette Portal', url: 'http://gazette.telangana.gov.in/', category: 'Telangana', department: 'Government Orders & Gazette' },
  { id: 'tg-eseva', name: 'TS E-Services Online Portal', url: 'http://www.esevaonline.telangana.gov.in', category: 'Telangana', department: 'E-Services' },
  { id: 'tg-meeseva', name: 'TS MeeSeva Services Directory', url: 'http://tg.meeseva.gov.in', category: 'Telangana', department: 'E-Services' },
  { id: 'tg-ipr', name: 'TS Information & Public Relations', url: 'http://ipr.tg.nic.in', category: 'Telangana', department: 'Other Important' },
  { id: 'tg-streenidhi', name: 'TS Streenidhi Women Welfare Ltd', url: 'https://www.streenidhi.telangana.gov.in', category: 'Telangana', department: 'Welfare Schemes' },
  { id: 'tg-civilsupplies', name: 'TS Civil Supplies Board', url: 'http://www.civilsupplies.telangana.gov.in', category: 'Telangana', department: 'Welfare Schemes' },
  { id: 'tg-tifs', name: 'TS Financial Intelligence System', url: 'https://tifs.telangana.gov.in', category: 'Telangana', department: 'Other Important' },

  // --- CENTRAL GOVERNMENT WEBSITES ---
  { id: 'c-upsc', name: 'Union Public Service Commission (UPSC)', url: 'https://upsc.gov.in', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-upsc-rec', name: 'UPSC Recruitment Board', url: 'https://upsc.gov.in/recruitment', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-upsc-exams', name: 'UPSC Examinations Hub', url: 'https://upsc.gov.in/exams', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-upsc-notif', name: 'UPSC Direct Notifications', url: 'https://upsc.gov.in/notification', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-ssc', name: 'Staff Selection Commission (SSC)', url: 'https://ssc.nic.in', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-ssc-exam', name: 'SSC Active Examinations', url: 'https://ssc.nic.in/examination', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-ssc-rec', name: 'SSC Recruitment Notices', url: 'https://ssc.nic.in/recruitment', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-rrb-online', name: 'Railway Recruitment Board Online', url: 'https://rrbonline.gov.in', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-rrb-jobs', name: 'RRB Career Opportunities', url: 'https://rrbonline.gov.in/job', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-rrb-central', name: 'RRB Central Selection Board', url: 'https://www.rrbcdg.gov.in', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-ibps', name: 'Institute of Banking Personnel Selection', url: 'https://www.ibps.in', category: 'Central', department: 'Banking Recruitment' },
  { id: 'c-ibps-rec', name: 'IBPS Active Career Portals', url: 'https://www.ibps.in/recruitment', category: 'Central', department: 'Banking Recruitment' },
  { id: 'c-sbi-careers', name: 'State Bank of India (SBI) Careers', url: 'https://www.sbi.co.in/careers', category: 'Central', department: 'Banking Recruitment' },
  { id: 'c-rbi-jobs', name: 'Reserve Bank of India (RBI) Jobs', url: 'https://www.rbi.org.in/jobs', category: 'Central', department: 'Banking Recruitment' },
  { id: 'c-rrb-bank', name: 'RRB Regional Banking Boards', url: 'https://www.rrb.org', category: 'Central', department: 'Banking Recruitment' },
  { id: 'c-dopt', name: 'Department of Personnel & Training', url: 'https://dopt.gov.in', category: 'Central', department: 'Administration' },
  { id: 'c-dopt-rec', name: 'DOPT Direct Recruitment Desk', url: 'https://dopt.gov.in/recruitment', category: 'Central', department: 'Administration' },
  { id: 'c-dopt-gazette', name: 'GoI Central Gazette Search', url: 'https://dopt.gov.in/gazette', category: 'Central', department: 'Government Gazettes' },
  { id: 'c-fci', name: 'Food Corporation of India (FCI)', url: 'https://www.fci.gov.in', category: 'Central', department: 'Central PSU' },
  { id: 'c-fci-rec', name: 'FCI Recruitment Cell', url: 'https://www.fci.gov.in/recruitment', category: 'Central', department: 'Central PSU' },
  { id: 'c-post', name: 'Indian Post Office Department', url: 'https://www.indianpost.gov.in', category: 'Central', department: 'Central Department' },
  { id: 'c-iocl', name: 'Indian Oil Corporation Careers', url: 'https://www.iocl.com', category: 'Central', department: 'Central PSU' },
  { id: 'c-bpcl', name: 'Bharat Petroleum Recruitment', url: 'https://www.bpcl.com', category: 'Central', department: 'Central PSU' },
  { id: 'c-ntpc', name: 'NTPC Career Openings', url: 'https://www.ntpc.co.in', category: 'Central', department: 'Central PSU' },
  { id: 'c-powergrid', name: 'Power Grid Corp. India Ltd', url: 'https://www.powergridindia.com', category: 'Central', department: 'Central PSU' },
  { id: 'c-bsnl', name: 'BSNL Recruitment Desk', url: 'https://www.bsnl.co.in', category: 'Central', department: 'Central PSU' },
  { id: 'c-mtnl', name: 'MTNL Employment Portal', url: 'https://www.mtnl.in', category: 'Central', department: 'Central PSU' },
  { id: 'c-nbe', name: 'National Board of Examinations (NBE)', url: 'https://www.nbe.gov.in', category: 'Central', department: 'Central Department' },
  { id: 'c-ssc-india', name: 'Central Staff Selection Board Delhi', url: 'https://www.sscindia.nic.in', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-army', name: 'Join Indian Army Official', url: 'https://indianarmy.nic.in', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-army-rec', name: 'Indian Army Direct Recruitment Portal', url: 'https://indianarmy.nic.in/recruitment', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-navy', name: 'Join Indian Navy Official', url: 'https://www.navy.gov.in', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-navy-rec', name: 'Indian Navy Career Openings', url: 'https://www.navy.gov.in/recruitment', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-airforce', name: 'Indian Air Force Careers', url: 'https://indianairforce.nic.in', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-airforce-rec', name: 'IAF Direct Recruitment Board', url: 'https://indianairforce.nic.in/recruitment', category: 'Central', department: 'Defence & Paramilitary' },

  // --- POPULAR REFERENCE JOBS WEBSITES ---
  { id: 'ref-sarkari', name: 'Sarkari Result Central Portal', url: 'https://www.sarkariresult.com', category: 'Central', department: 'Job Directory Services' },
  { id: 'ref-sarkari-ap', name: 'Sarkari Result AP Portal', url: 'https://www.sarkariresult.com/ap', category: 'Andhra Pradesh', department: 'Job Directory Services' },
  { id: 'ref-testbook', name: 'Testbook Government Jobs Center', url: 'https://testbook.com', category: 'Central', department: 'Job Directory Services' },
  { id: 'ref-testbook-tg', name: 'Testbook Telangana Recruitment Hub', url: 'https://testbook.com/te', category: 'Telangana', department: 'Job Directory Services' },

  // --- KARNATAKA GOVERNMENT WEBSITES ---
  { id: 'ka-portal', name: 'Karnataka State Government Portal', url: 'https://karnataka.gov.in', category: 'Karnataka', department: 'Main State Portal' },
  { id: 'ka-psc', name: 'Karnataka Public Service Commission (KPSC)', url: 'https://ksc.karnataka.gov.in', category: 'Karnataka', department: 'Recruitment Board' },
  { id: 'ka-police', name: 'Karnataka State Police (KSP)', url: 'https://ksp.karnataka.gov.in', category: 'Karnataka', department: 'Police & Security' },
  { id: 'ka-careers', name: 'Karnataka Careers Direct', url: 'https://www.karnatakacareers.org', category: 'Karnataka', department: 'Employment Services' },
  { id: 'ka-kio', name: 'Karnataka Information Office', url: 'https://kio.karnataka.gov.in', category: 'Karnataka', department: 'E-Governance' },
  { id: 'ka-edu', name: 'Karnataka School Teachers Board', url: 'https://karresults.nic.in', category: 'Karnataka', department: 'Education Department' },

  // --- TAMIL NADU GOVERNMENT WEBSITES ---
  { id: 'tn-portal', name: 'Tamil Nadu State Government Portal', url: 'https://tn.gov.in', category: 'Tamil Nadu', department: 'Main State Portal' },
  { id: 'tn-psc', name: 'Tamil Nadu Public Service Commission (TNPSC)', url: 'https://tnpsc.gov.in', category: 'Tamil Nadu', department: 'Recruitment Board' },
  { id: 'tn-police', name: 'Tamil Nadu State Police Direct', url: 'https://www.tnpolice.gov.in', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-trb', name: 'Tamil Nadu Teacher Recruitment Board', url: 'https://www.trb.tn.gov.in', category: 'Tamil Nadu', department: 'Recruitment Board' },
  { id: 'tn-tet', name: 'Tamil Nadu Teacher Eligibility Test Portal', url: 'https://www.tntet.in', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-health', name: 'TN Health & Family Welfare Department', url: 'https://www.tn.gov.in/departments/11/health-and-family-welfare', category: 'Tamil Nadu', department: 'Health Department' },

  // --- UTTAR PRADESH GOVERNMENT WEBSITES ---
  { id: 'up-portal', name: 'Uttar Pradesh State Government Portal', url: 'https://up.gov.in', category: 'Uttar Pradesh', department: 'Main State Portal' },
  { id: 'up-cmo', name: 'UP Chief Minister Office', url: 'https://cmo.up.nic.in', category: 'Uttar Pradesh', department: 'Administration' },
  { id: 'up-psc', name: 'Uttar Pradesh Public Service Commission (UPPSC)', url: 'https://uppsc.up.nic.in', category: 'Uttar Pradesh', department: 'Recruitment Board' },
  { id: 'up-sssc', name: 'UP Subordinate Services Selection Commission', url: 'https://upsssc.gov.in', category: 'Uttar Pradesh', department: 'Recruitment Board' },
  { id: 'up-police', name: 'Uttar Pradesh Police Headquarters', url: 'https://uppolice.gov.in', category: 'Uttar Pradesh', department: 'Police & Security' },
  { id: 'up-police-rec', name: 'UP Police Recruitment Board (UPPRPB)', url: 'https://uppbpb.gov.in', category: 'Uttar Pradesh', department: 'Police & Security' },
  { id: 'up-teachers', name: 'UP Secondary Education recruitment (UPES)', url: 'https://upes.up.nic.in', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-nhsrc', name: 'UP National Health Resource Cell (NHM)', url: 'https://upnhsrc.in', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-agriculture', name: 'UP Department of Agriculture', url: 'https://agri.up.nic.in', category: 'Uttar Pradesh', department: 'Agriculture Department' },
  { id: 'up-forest', name: 'UP Environment & Forest Board', url: 'https://forest.up.gov.in', category: 'Uttar Pradesh', department: 'Forest & Environment' },
  { id: 'up-panchayat', name: 'UP Directorate of Panchayat Raj', url: 'https://panchayat.up.gov.in', category: 'Uttar Pradesh', department: 'Rural Development' },
  { id: 'up-jobs', name: 'Uttar Pradesh Employment Gateway', url: 'https://upjobs.nic.in', category: 'Uttar Pradesh', department: 'Employment Services' },

  // --- MAHARASHTRA GOVERNMENT WEBSITES ---
  { id: 'mh-portal', name: 'Maharashtra State Government Portal', url: 'https://maharashtra.gov.in', category: 'Maharashtra', department: 'Main State Portal' },
  { id: 'mh-psc', name: 'Maharashtra Public Service Commission (MPSC)', url: 'https://mpsc.maharashtra.gov.in', category: 'Maharashtra', department: 'Recruitment Board' },
  { id: 'mh-police', name: 'Maharashtra State Police Recruitment', url: 'https://mahapolice.maharashtra.gov.in', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-jobs', name: 'MahaJobs Career Portal', url: 'https://mahajobs.maharashtra.gov.in', category: 'Maharashtra', department: 'Employment Services' },
  { id: 'mh-health', name: 'Maharashtra Public Health Department', url: 'https://health.maharashtra.gov.in', category: 'Maharashtra', department: 'Health Department' },
  { id: 'mh-agri', name: 'Maharashtra Agriculture Department', url: 'https://agriculture.maharashtra.gov.in', category: 'Maharashtra', department: 'Agriculture Department' },

  // --- BIHAR GOVERNMENT WEBSITES ---
  { id: 'br-portal', name: 'Bihar State Government Portal', url: 'https://bihar.nic.in', category: 'Bihar', department: 'Main State Portal' },
  { id: 'br-cmo', name: 'Bihar Chief Minister Office', url: 'https://cm.bihar.gov.in', category: 'Bihar', department: 'Administration' },
  { id: 'br-psc', name: 'Bihar Public Service Commission (BPSC)', url: 'https://bpsc.bih.nic.in', category: 'Bihar', department: 'Recruitment Board' },
  { id: 'br-sssc', name: 'Bihar Police Sub-ordinate Services Commission', url: 'https://bsssbihar.org', category: 'Bihar', department: 'Police Recruitment' },
  { id: 'br-police', name: 'Bihar State Police HQ', url: 'https://police.bihar.gov.in', category: 'Bihar', department: 'Police & Security' },
  { id: 'br-btsc', name: 'Bihar Technical Service Commission', url: 'https://btsc.bih.nic.in', category: 'Bihar', department: 'Recruitment Board' },
  { id: 'br-teachers', name: 'Bihar School Examination Board (BSEB)', url: 'https://bseb.in', category: 'Bihar', department: 'Education Department' },
  { id: 'br-health', name: 'Bihar State Health Society', url: 'https://health.bihar.gov.in', category: 'Bihar', department: 'Health Department' },
  { id: 'br-agri', name: 'Bihar Directorate of Agriculture', url: 'https://agriculture.bihar.gov.in', category: 'Bihar', department: 'Agriculture Department' },

  // --- WEST BENGAL GOVERNMENT WEBSITES ---
  { id: 'wb-portal', name: 'West Bengal State Government Portal', url: 'https://wb.gov.in', category: 'West Bengal', department: 'Main State Portal' },
  { id: 'wb-psc', name: 'West Bengal Public Service Commission', url: 'https://wbpsc.gov.in', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-ssc', name: 'West Bengal Staff Selection Commission', url: 'https://wbssc.gov.in', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-police', name: 'West Bengal Police Recruitment Board', url: 'https://police.wb.gov.in', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-teachers', name: 'West Bengal Teacher Recruitment Board', url: 'https://wbtedgwb.in', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-health', name: 'West Bengal Health & Family Welfare', url: 'https://health.wb.gov.in', category: 'West Bengal', department: 'Health Department' },

  // --- MADHYA PRADESH GOVERNMENT WEBSITES ---
  { id: 'mp-portal', name: 'Madhya Pradesh State Government Portal', url: 'https://mp.gov.in', category: 'Madhya Pradesh', department: 'Main State Portal' },
  { id: 'mp-peb', name: 'Madhya Pradesh Professional Board (MPPEB)', url: 'https://peb.mp.gov.in', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-psc', name: 'Madhya Pradesh Public Service Commission (MPPSC)', url: 'https://mppsc.mp.gov.in', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-police', name: 'Madhya Pradesh State Police', url: 'https://mpcowab.mp.gov.in', category: 'Madhya Pradesh', department: 'Police & Security' },
  { id: 'mp-teachers', name: 'MP School Education Department', url: 'https://mpeducation.gov.in', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-health', name: 'MP Public Health Department', url: 'https://health.mp.gov.in', category: 'Madhya Pradesh', department: 'Health Department' },
  { id: 'mp-agri', name: 'MP Farmers Welfare & Land Department', url: 'https://agriculture.mp.gov.in', category: 'Madhya Pradesh', department: 'Agriculture Department' },

  // --- RAJASTHAN GOVERNMENT WEBSITES ---
  { id: 'rj-portal', name: 'Rajasthan State Government Portal', url: 'https://rajasthan.gov.in', category: 'Rajasthan', department: 'Main State Portal' },
  { id: 'rj-psc', name: 'Rajasthan Public Service Commission (RPSC)', url: 'https://rpsc.rajasthan.gov.in', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-ssc', name: 'Rajasthan Staff Selection Board (RSSB)', url: 'https://rrb.jodhpur.gov.in', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-police', name: 'Rajasthan State Police Department', url: 'https://police.rajasthan.gov.in', category: 'Rajasthan', department: 'Police & Security' },
  { id: 'rj-teachers', name: 'Rajasthan Board of Secondary Education', url: 'https://rajeduboard.rajasthan.gov.in', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-health', name: 'Rajasthan Medical & Health Services', url: 'https://health.rajasthan.gov.in', category: 'Rajasthan', department: 'Health Department' },

  // --- GUJARAT GOVERNMENT WEBSITES ---
  { id: 'gj-portal', name: 'Gujarat State Government Portal', url: 'https://guj.nic.in/', category: 'Gujarat', department: 'Main State Portal' },
  { id: 'gj-cmo', name: 'Gujarat Chief Minister Office', url: 'https://cm.gujarat.gov.in', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-psc', name: 'Gujarat Public Service Commission (GPSC)', url: 'https://gpsc.gujarat.gov.in/', category: 'Gujarat', department: 'Recruitment Board' },
  { id: 'gj-sssb', name: 'Gujarat Subordinate Service Selection Board (GSSSB)', url: 'https://gsssb.gujarat.gov.in/', category: 'Gujarat', department: 'Recruitment Board' },
  { id: 'gj-police', name: 'Gujarat Police Department', url: 'https://police.gujarat.gov.in/', category: 'Gujarat', department: 'Police & Security' },
  { id: 'gj-teachers', name: 'Gujarat Education Board', url: 'https://edugujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-health', name: 'Gujarat Health Department', url: 'https://health.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },

  // --- ODISHA GOVERNMENT WEBSITES ---
  { id: 'od-portal', name: 'Odisha State Government Portal', url: 'https://odisha.gov.in/', category: 'Odisha', department: 'Main State Portal' },
  { id: 'od-psc', name: 'Odisha Public Service Commission (OPSC)', url: 'https://opsc.gov.in/', category: 'Odisha', department: 'Recruitment Board' },
  { id: 'od-ssc', name: 'Odisha Staff Selection Commission (OSSC)', url: 'https://ossc.gov.in/', category: 'Odisha', department: 'Recruitment Board' },
  { id: 'od-police', name: 'Odisha State Police', url: 'https://police.odisha.gov.in/', category: 'Odisha', department: 'Police & Security' },
  { id: 'od-teachers', name: 'Odisha Department of School Education', url: 'https://odisha.gov.in/departments/education', category: 'Odisha', department: 'Education Department' },
  { id: 'od-health', name: 'Odisha Health & Family Welfare', url: 'https://health.odisha.gov.in/', category: 'Odisha', department: 'Health Department' },

  // --- KERALA GOVERNMENT WEBSITES ---
  { id: 'kl-portal', name: 'Kerala State Government Portal', url: 'https://kerala.gov.in/', category: 'Kerala', department: 'Main State Portal' },
  { id: 'kl-psc', name: 'Kerala Public Service Commission (KPSC)', url: 'https://keralapsc.gov.in/', category: 'Kerala', department: 'Recruitment Board' },
  { id: 'kl-police', name: 'Kerala State Police', url: 'https://police.kerala.gov.in/', category: 'Kerala', department: 'Police & Security' },
  { id: 'kl-teachers', name: 'Kerala General Education Department', url: 'https://education.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-health', name: 'Kerala Health Services Department', url: 'https://health.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-police-rec', name: 'Kerala Police Recruitment Desk', url: 'https://police.kerala.gov.in/', category: 'Kerala', department: 'Employment Services' },

  // --- PUNJAB GOVERNMENT WEBSITES ---
  { id: 'pb-portal', name: 'Punjab State Government Portal', url: 'https://punjab.gov.in/', category: 'Punjab', department: 'Main State Portal' },
  { id: 'pb-psc', name: 'Punjab Public Service Commission (PPSC)', url: 'https://ppsc.punjab.gov.in/', category: 'Punjab', department: 'Recruitment Board' },
  { id: 'pb-police', name: 'Punjab Police Department', url: 'https://punjabpolice.gov.in/', category: 'Punjab', department: 'Police & Security' },
  { id: 'pb-teachers', name: 'Punjab School Education Board', url: 'https://education.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-health', name: 'Punjab Health & Family Welfare', url: 'https://health.punjab.gov.in/', category: 'Punjab', department: 'Health Department' },

  // --- HARYANA GOVERNMENT WEBSITES ---
  { id: 'hr-portal', name: 'Haryana State Government Portal', url: 'https://haryana.gov.in/', category: 'Haryana', department: 'Main State Portal' },
  { id: 'hr-psc', name: 'Haryana Public Service Commission (HPPSC)', url: 'https://haryanapsc.gov.in', category: 'Haryana', department: 'Recruitment Board' },
  { id: 'hr-ssc', name: 'Haryana Staff Selection Commission (HSSC)', url: 'https://hssc.haryana.gov.in/', category: 'Haryana', department: 'Recruitment Board' },
  { id: 'hr-police', name: 'Haryana State Police', url: 'https://haryanapolice.gov.in/', category: 'Haryana', department: 'Police & Security' },
  { id: 'hr-teachers', name: 'Haryana Department of School Education', url: 'https://educationhry.nic.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-health', name: 'Haryana Health Department Division', url: 'https://healthhry.nic.in/', category: 'Haryana', department: 'Health Department' },

  // --- JHARKHAND GOVERNMENT WEBSITES ---
  { id: 'jh-portal', name: 'Jharkhand State Government Portal', url: 'https://jharkhand.gov.in/', category: 'Jharkhand', department: 'Main State Portal' },
  { id: 'jh-psc', name: 'Jharkhand Public Service Commission (JPSC)', url: 'https://jrpsc.jharkhand.gov.in/', category: 'Jharkhand', department: 'Recruitment Board' },
  { id: 'jh-ssc', name: 'Jharkhand Staff Selection Commission (JSSC)', url: 'https://jssc.jharkhand.gov.in/', category: 'Jharkhand', department: 'Recruitment Board' },
  { id: 'jh-police', name: 'Jharkhand Police Force', url: 'https://police.jharkhand.gov.in/', category: 'Jharkhand', department: 'Police & Security' },
  { id: 'jh-teachers', name: 'Jharkhand School Education Board', url: 'https://education.jharkhand.gov.in/', category: 'Jharkhand', department: 'Education Department' },
  { id: 'jh-health', name: 'Jharkhand Health & Family Welfare', url: 'https://health.jharkhand.gov.in/', category: 'Jharkhand', department: 'Health Department' },

  // --- ASSAM GOVERNMENT WEBSITES ---
  { id: 'as-portal', name: 'Assam State Government Portal', url: 'https://assam.gov.in/', category: 'Assam', department: 'Main State Portal' },
  { id: 'as-psc', name: 'Assam Public Service Commission (APSC)', url: 'https://apsc.in/', category: 'Assam', department: 'Recruitment Board' },
  { id: 'as-police', name: 'Assam Police Headquarters', url: 'https://police.assam.gov.in/', category: 'Assam', department: 'Police & Security' },
  { id: 'as-teachers', name: 'Assam Secondary Education Department', url: 'https://education.assam.gov.in/', category: 'Assam', department: 'Education Department' },
  { id: 'as-health', name: 'Assam Health Department Commission', url: 'https://health.assam.gov.in/', category: 'Assam', department: 'Health Department' },

  // --- CHHATTISGARH GOVERNMENT WEBSITES ---
  { id: 'cg-portal', name: 'Chhattisgarh State Government Portal', url: 'https://chhattisgarh.nic.in/', category: 'Chhattisgarh', department: 'Main State Portal' },
  { id: 'cg-psc', name: 'Chhattisgarh Public Service Commission (CGPSC)', url: 'https://cgpsc.cg.gov.in/', category: 'Chhattisgarh', department: 'Recruitment Board' },
  { id: 'cg-gbs', name: 'Chhattisgarh Board of Secondary Education', url: 'https://cgbs.cg.gov.in/', category: 'Chhattisgarh', department: 'Education Department' },
  { id: 'cg-police', name: 'Chhattisgarh State Police HQ', url: 'https://police.cg.nic.in/', category: 'Chhattisgarh', department: 'Police & Security' },
  { id: 'cg-teachers', name: 'Chhattisgarh Education Department', url: 'https://education.cg.nic.in/', category: 'Chhattisgarh', department: 'Education Department' },
  { id: 'cg-health', name: 'Chhattisgarh Department of Health', url: 'https://health.cg.nic.in/', category: 'Chhattisgarh', department: 'Health Department' },

  // --- UTTARAKHAND GOVERNMENT WEBSITES ---
  { id: 'uk-portal', name: 'Uttarakhand State Government Portal', url: 'https://uk.gov.in/', category: 'Uttarakhand', department: 'Main State Portal' },
  { id: 'uk-psc', name: 'Uttarakhand Public Service Commission (UKPSC)', url: 'https://ukpsc.gov.in/', category: 'Uttarakhand', department: 'Recruitment Board' },
  { id: 'uk-police', name: 'Uttarakhand Police force', url: 'https://ukpolice.gov.in/', category: 'Uttarakhand', department: 'Police & Security' },
  { id: 'uk-teachers', name: 'Uttarakhand School Education Portal', url: 'https://education.uk.gov.in/', category: 'Uttarakhand', department: 'Education Department' },
  { id: 'uk-health', name: 'Uttarakhand Health General Services', url: 'https://health.uk.gov.in/', category: 'Uttarakhand', department: 'Health Department' },

  // --- HIMACHAL PRADESH GOVERNMENT WEBSITES ---
  { id: 'hp-portal', name: 'Himachal Pradesh State Government Portal', url: 'https://himachal.nic.in/', category: 'Himachal Pradesh', department: 'Main State Portal' },
  { id: 'hp-ssc', name: 'Himachal Pradesh Staff Selection Commission', url: 'https://hpssc.hp.gov.in/', category: 'Himachal Pradesh', department: 'Recruitment Board' },
  { id: 'hp-psc', name: 'Himachal Pradesh Public Service Commission', url: 'https://hppsc.hp.gov.in/', category: 'Himachal Pradesh', department: 'Recruitment Board' },
  { id: 'hp-police', name: 'Himachal Pradesh State Police Force', url: 'https://hppolice.gov.in/', category: 'Himachal Pradesh', department: 'Police & Security' },
  { id: 'hp-teachers', name: 'Himachal Department of Higher Education', url: 'https://education.hp.nic.in/', category: 'Himachal Pradesh', department: 'Education Department' },
  { id: 'hp-health', name: 'Himachal Health & Family Welfare department', url: 'https://health.hp.nic.in/', category: 'Himachal Pradesh', department: 'Health Department' },

  // --- JAMMU AND KASHMIR (UT) GOVERNMENT WEBSITES ---
  { id: 'jk-portal', name: 'Jammu & Kashmir Government Portal', url: 'https://jk.gov.in/', category: 'Jammu & Kashmir', department: 'Main State Portal' },
  { id: 'jk-psc', name: 'J&K Public Service Commission (JKPSC)', url: 'https://jkpsc.nic.in/', category: 'Jammu & Kashmir', department: 'Recruitment Board' },
  { id: 'jk-police', name: 'Jammu & Kashmir Police Force', url: 'https://jkpolice.gov.in/', category: 'Jammu & Kashmir', department: 'Police & Security' },
  { id: 'jk-teachers', name: 'J&K School Education Ministry', url: 'https://education.gov.in/', category: 'Jammu & Kashmir', department: 'Education Department' },
  { id: 'jk-health', name: 'J&K Department of Family Welfare', url: 'https://health.jk.gov.in/', category: 'Jammu & Kashmir', department: 'Health Department' },

  // --- TRIPURA GOVERNMENT WEBSITES ---
  { id: 'tr-portal', name: 'Tripura State Government Portal', url: 'https://tripura.nic.in/', category: 'Tripura', department: 'Main State Portal' },
  { id: 'tr-psc', name: 'Tripura Public Service Commission (TPSC)', url: 'https://tppsc.tripura.gov.in/', category: 'Tripura', department: 'Recruitment Board' },
  { id: 'tr-police', name: 'Tripura State Police', url: 'https://police.tripura.gov.in/', category: 'Tripura', department: 'Police & Security' },
  { id: 'tr-teachers', name: 'Tripura Higher Education Board', url: 'https://education.tripura.gov.in/', category: 'Tripura', department: 'Education Department' },

  // --- MANIPUR GOVERNMENT WEBSITES ---
  { id: 'mn-portal', name: 'Manipur State Government Portal', url: 'https://manipur.gov.in/', category: 'Manipur', department: 'Main State Portal' },
  { id: 'mn-psc', name: 'Manipur Public Service Commission (MPPSC)', url: 'https://mppsc.manipur.gov.in/', category: 'Manipur', department: 'Recruitment Board' },
  { id: 'mn-police', name: 'Manipur State Police Department', url: 'https://police.manipur.gov.in/', category: 'Manipur', department: 'Police & Security' },
  { id: 'mn-teachers', name: 'Manipur Secondary Education Department', url: 'https://education.manipur.gov.in/', category: 'Manipur', department: 'Education Department' },

  // --- MEGHALAYA GOVERNMENT WEBSITES ---
  { id: 'me-portal', name: 'Meghalaya State Government Portal', url: 'https://meghalaya.gov.in/', category: 'Meghalaya', department: 'Main State Portal' },
  { id: 'me-psc', name: 'Meghalaya Public Service Commission (MPSC)', url: 'https://mpsc.meghalaya.gov.in/', category: 'Meghalaya', department: 'Recruitment Board' },
  { id: 'me-police', name: 'Meghalaya Police Headquarters', url: 'https://police.meghalaya.gov.in/', category: 'Meghalaya', department: 'Police & Security' },
  { id: 'me-teachers', name: 'Meghalaya State Education Board', url: 'https://education.meghalaya.gov.in/', category: 'Meghalaya', department: 'Education Department' },

  // --- MIZORAM GOVERNMENT WEBSITES ---
  { id: 'mz-portal', name: 'Mizoram State Government Portal', url: 'https://mizoram.nic.in/', category: 'Mizoram', department: 'Main State Portal' },
  { id: 'mz-psc', name: 'Mizoram Public Service Commission', url: 'https://secs.mizoram.gov.in/', category: 'Mizoram', department: 'Recruitment Board' },
  { id: 'mz-police', name: 'Mizoram State Police Force', url: 'https://police.mizoram.gov.in/', category: 'Mizoram', department: 'Police & Security' },

  // --- NAGALAND GOVERNMENT WEBSITES ---
  { id: 'ng-portal', name: 'Nagaland State Government Portal', url: 'https://nagaland.gov.in/', category: 'Nagaland', department: 'Main State Portal' },
  { id: 'ng-psc', name: 'Nagaland Public Service Commission (NPSC)', url: 'https://npsc.nagaland.gov.in/', category: 'Nagaland', department: 'Recruitment Board' },
  { id: 'ng-police', name: 'Nagaland State Police', url: 'https://police.nagaland.gov.in/', category: 'Nagaland', department: 'Police & Security' },

  // --- SIKKIM GOVERNMENT WEBSITES ---
  { id: 'sk-portal', name: 'Sikkim State Government Portal', url: 'https://sikkim.gov.in/', category: 'Sikkim', department: 'Main State Portal' },
  { id: 'sk-psc', name: 'Sikkim Public Service Commission (SPSC)', url: 'https://spscsikkim.gov.in/', category: 'Sikkim', department: 'Recruitment Board' },
  { id: 'sk-police', name: 'Sikkim State Police Department', url: 'https://police.sikkim.gov.in/', category: 'Sikkim', department: 'Police & Security' },

  // --- ARUNACHAL PRADESH GOVERNMENT WEBSITES ---
  { id: 'ar-portal', name: 'Arunachal State Government Portal', url: 'https://arunachal.nic.in/', category: 'Arunachal Pradesh', department: 'Main State Portal' },
  { id: 'ar-psc', name: 'Arunachal Public Service Commission', url: 'https://apsc.arunachal.nic.in/', category: 'Arunachal Pradesh', department: 'Recruitment Board' },
  { id: 'ar-police', name: 'Arunachal State Police force', url: 'https://police.arunachal.nic.in/', category: 'Arunachal Pradesh', department: 'Police & Security' },

  // --- GOA GOVERNMENT WEBSITES ---
  { id: 'ga-portal', name: 'Goa State Government Portal', url: 'https://www.goa.gov.in/', category: 'Goa', department: 'Main State Portal' },
  { id: 'ga-psc', name: 'Goa Public Service Commission (GPSC)', url: 'https://gpsc.goa.gov.in/', category: 'Goa', department: 'Recruitment Board' },
  { id: 'ga-police', name: 'Goa Police Department', url: 'https://police.goa.gov.in/', category: 'Goa', department: 'Police & Security' },

  // --- DELHI NCT GOVERNMENT WEBSITES ---
  { id: 'dl-portal', name: 'Delhi Govt Information Portal', url: 'https://delhi.gov.in/', category: 'Delhi', department: 'Main State Portal' },
  { id: 'dl-sssb', name: 'Delhi Subordinate Services Board (DSSSB)', url: 'https://dsssb.delhigovt.nic.in/', category: 'Delhi', department: 'Recruitment Board' },
  { id: 'dl-police-head', name: 'Delhi Police Recruitment Headquarters', url: 'https://delhigovt.nic.in/', category: 'Delhi', department: 'Police & Security' },

  // --- PUDUCHERRY UNION TERRITORY ---
  { id: 'py-portal', name: 'Puducherry Government Portal', url: 'https://py.gov.in/', category: 'Puducherry', department: 'Main State Portal' },
  { id: 'py-psc', name: 'Puducherry Service Selection Board', url: 'https://psc.py.gov.in/', category: 'Puducherry', department: 'Recruitment Board' },

  // --- CHANDIGARH UNION TERRITORY ---
  { id: 'ch-portal', name: 'Chandigarh Administration Portal', url: 'https://chandigarh.gov.in/', category: 'Chandigarh', department: 'Main State Portal' },
  { id: 'ch-ssb', name: 'Chandigarh Staff Selection Board', url: 'https://ssbchd.gov.in/', category: 'Chandigarh', department: 'Recruitment Board' },

  // --- ANDAMAN & NICOBAR ISLANDS ---
  { id: 'an-portal', name: 'Andaman & Nicobar Administration', url: 'https://andaman.gov.in/', category: 'Andaman & Nicobar', department: 'Main State Portal' },

  // --- DADRA & NAGAR HAVELI, DAMAN & DIU ---
  { id: 'dd-portal', name: 'Dadra & Nagar Daman & Diu Portal', url: 'https://dnh.gov.in/', category: 'Dadra & Nagar Haveli', department: 'Main State Portal' },

  // --- LADAKH ---
  { id: 'ld-portal', name: 'Ladakh Administration Portal', url: 'https://ladakh.gov.in/', category: 'Ladakh', department: 'Main State Portal' },

  // --- LAKSHADWEEP ---
  { id: 'lw-portal', name: 'Lakshadweep Administration Portal', url: 'https://lakshadweep.gov.in/', category: 'Lakshadweep', department: 'Main State Portal' },

  // --- CENTRAL GOVERNMENT EXTENSIONS ---
  { id: 'c-ssc-cgl', name: 'SSC Combined Graduate Level', url: 'https://ssc.nic.in', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-ssc-chsl', name: 'SSC Combined Higher Secondary', url: 'https://ssc.nic.in', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-rrb-ntpc', name: 'RRB NTPC Central Recruitment', url: 'https://rrbnntpccen.in/', category: 'Central', department: 'Recruitment Board' },
  { id: 'c-join-army', name: 'Join Indian Army Recruitment', url: 'https://joinindianarmy.nic.in/', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-bsf', name: 'Border Security Force (BSF)', url: 'https://bsf.gov.in/', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-cisf', name: 'Central Industrial Security Force', url: 'https://cisf.gov.in/', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-crpf', name: 'Central Reserve Police Force', url: 'https://crpf.gov.in/', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-itbp', name: 'Indo-Tibetan Border Police', url: 'https://itbpolice.nic.in/', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-g-ssb', name: 'Sashastra Seema Bal (SSB)', url: 'https://ssb.gov.in/', category: 'Central', department: 'Defence & Paramilitary' },
  { id: 'c-emp-news', name: 'Employment News Government Weekly', url: 'https://employmentnews.gov.in/', category: 'Central', department: 'Job Directory Services' },
  { id: 'c-ncs-portal', name: 'National Career Service Portal', url: 'https://www.ncs.gov.in/', category: 'Central', department: 'Job Directory Services' },
  { id: 'c-all-jobs', name: 'All India Gov Jobs Portal', url: 'https://allgovernmentjobs.in', category: 'Central', department: 'Job Directory Services' }
];
