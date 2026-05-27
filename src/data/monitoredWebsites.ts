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

  // --- KARNATAKA STATE GOVERNMENT WEBSITES ---
  { id: 'ka-portal', name: 'Karnataka State Government Portal', url: 'https://karnataka.gov.in/', category: 'Karnataka', department: 'Main State Portal' },
  { id: 'ka-cmo', name: 'Karnataka CM Office', url: 'https://cmkarnataka.gov.in/', category: 'Karnataka', department: 'Administration' },
  { id: 'ka-cm-press', name: 'Karnataka CM Press Releases', url: 'https://cmkarnataka.gov.in/press-releases', category: 'Karnataka', department: 'Administration' },
  { id: 'ka-news', name: 'Karnataka Latest News', url: 'https://karnataka.gov.in/news', category: 'Karnataka', department: 'Administration' },
  { id: 'ka-psc', name: 'Karnataka Public Service Commission (KPSC)', url: 'https://kpsc.kar.nic.in/', category: 'Karnataka', department: 'Recruitment Board' },
  { id: 'ka-psc-online', name: 'KPSC Online Recruitment Portal', url: 'https://ksrec.kar.nic.in/', category: 'Karnataka', department: 'Recruitment Board' },
  { id: 'ka-careers', name: 'Karnataka Careers Portal', url: 'https://www.karnatakacareers.org', category: 'Karnataka', department: 'Employment Services' },
  { id: 'ka-police', name: 'Karnataka State Police (KSP)', url: 'https://ksp.karnataka.gov.in/', category: 'Karnataka', department: 'Police & Security' },
  { id: 'ka-police-rec', name: 'KSP Police Careers/Recruitment', url: 'https://ksp.karnataka.gov.in/careers', category: 'Karnataka', department: 'Police & Security' },
  { id: 'ka-kea', name: 'Karnataka Examinations Authority (KEA)', url: 'https://kea.kar.nic.in/', category: 'Karnataka', department: 'Recruitment Board' },
  { id: 'ka-tet', name: 'Karnataka Teacher Eligibility Test (TET)', url: 'https://kea.kar.nic.in/', category: 'Karnataka', department: 'Education Department' },
  { id: 'ka-health', name: 'Karnataka Health Department', url: 'https://health.karnataka.gov.in/', category: 'Karnataka', department: 'Health Department' },
  { id: 'ka-medical', name: 'Karnataka Medical Education Department', url: 'https://medical.karnataka.gov.in/', category: 'Karnataka', department: 'Health Department' },
  { id: 'ka-agri', name: 'Karnataka Agriculture Department', url: 'https://agriculture.karnataka.gov.in/', category: 'Karnataka', department: 'Agriculture Department' },
  { id: 'ka-forest', name: 'Karnataka Forest Department', url: 'https://forest.karnataka.gov.in/', category: 'Karnataka', department: 'Forest & Environment' },
  { id: 'ka-horti', name: 'Karnataka Horticulture Department', url: 'https://horticulture.karnataka.gov.in/', category: 'Karnataka', department: 'Agriculture Department' },
  { id: 'ka-ksrtc', name: 'Karnataka State Road Transport Corporation (KSRTC)', url: 'https://ksrtc.karnataka.gov.in/', category: 'Karnataka', department: 'Transport & Infrastructure' },
  { id: 'ka-bescom', name: 'Bangalore Electricity Supply Company (BESCOM)', url: 'https://bescom.karnataka.gov.in/', category: 'Karnataka', department: 'Power Sector' },
  { id: 'ka-kptcl', name: 'Karnataka Power Transmission Corporation (KPTCL)', url: 'https://kptcl.karnataka.gov.in/', category: 'Karnataka', department: 'Power Sector' },
  { id: 'ka-mescom', name: 'Mangalore Electricity Supply Company (MESCOM)', url: 'https://mescom.karnataka.gov.in/', category: 'Karnataka', department: 'Power Sector' },
  { id: 'ka-gescom', name: 'Gulbarga Electricity Supply Company (GESCOM)', url: 'https://gescom.karnataka.gov.in/', category: 'Karnataka', department: 'Power Sector' },
  { id: 'ka-cescom', name: 'Chamundeshwari Electricity Supply Corporation (CESCOM)', url: 'https://cescom.karnataka.gov.in/', category: 'Karnataka', department: 'Power Sector' },
  { id: 'ka-edu-dept', name: 'Karnataka Primary & Secondary Education Department', url: 'https://education.karnataka.gov.in/', category: 'Karnataka', department: 'Education Department' },
  { id: 'ka-he', name: 'Karnataka Higher Education Department', url: 'https://he.karnataka.gov.in/', category: 'Karnataka', department: 'Education Department' },
  { id: 'ka-dte', name: 'Karnataka Directorate of Technical Education', url: 'https://dte.karnataka.gov.in/', category: 'Karnataka', department: 'Education Department' },
  { id: 'ka-pr', name: 'Karnataka Panchayat Raj Department', url: 'https://pr.karnataka.gov.in/', category: 'Karnataka', department: 'Rural Development' },
  { id: 'ka-revenue', name: 'Karnataka Revenue Department', url: 'https://revenue.karnataka.gov.in/', category: 'Karnataka', department: 'Revenue & Land Records' },
  { id: 'ka-land-rec', name: 'Karnataka Land Records Portal (Abhilasa)', url: 'https://abhilasa.karnataka.gov.in/', category: 'Karnataka', department: 'Revenue & Land Records' },
  { id: 'ka-igr', name: 'Karnataka Registration & Stamps Department (IGR)', url: 'https://igr.karnataka.gov.in/', category: 'Karnataka', department: 'Revenue & Land Records' },
  { id: 'ka-bda', name: 'Bangalore Development Authority (BDA)', url: 'https://bda.karnataka.gov.in/', category: 'Karnataka', department: 'Housing & Urban Development' },
  { id: 'ka-bmcl', name: 'Bangalore Metro Rail Corporation Ltd (BMRCL)', url: 'https://bmrc.co.in/', category: 'Karnataka', department: 'Transport & Infrastructure' },
  { id: 'ka-kredl', name: 'Karnataka Renewable Energy Development Ltd (KREDL)', url: 'https://kredl.karnataka.gov.in/', category: 'Karnataka', department: 'Power Sector' },
  { id: 'ka-kio', name: 'Karnataka Information Office', url: 'https://kio.karnataka.gov.in/', category: 'Karnataka', department: 'E-Governance' },
  { id: 'ka-nrega', name: 'Karnataka MGNREGA Job Services', url: 'https://nrega.karnataka.gov.in/', category: 'Karnataka', department: 'Rural Development' },
  { id: 'ka-scst-welfare', name: 'Karnataka SC/ST Welfare Department', url: 'https://stwelfare.karnataka.gov.in/', category: 'Karnataka', department: 'Welfare Schemes' },
  { id: 'ka-bc-welfare', name: 'Karnataka BC Welfare Department', url: 'https://bcwelfare.karnataka.gov.in/', category: 'Karnataka', department: 'Welfare Schemes' },
  { id: 'ka-minority-welfare', name: 'Karnataka Minority Welfare Department', url: 'https://minoritywelfare.karnataka.gov.in/', category: 'Karnataka', department: 'Welfare Schemes' },
  { id: 'ka-wcd', name: 'Karnataka Women & Child Development', url: 'https://wcd.karnataka.gov.in/', category: 'Karnataka', department: 'Welfare Schemes' },
  { id: 'ka-langanwadi', name: 'Karnataka Anganwadi Recruitment Portal', url: 'https://wcd.karnataka.gov.in/anganwadi', category: 'Karnataka', department: 'Welfare Schemes' },
  { id: 'ka-seva-sindhu', name: 'Karnataka Seva Sindhu Citizen Services', url: 'https://sevasindhu.karnataka.gov.in/', category: 'Karnataka', department: 'E-Services' },
  { id: 'ka-sakala', name: 'Karnataka Sakala Mission', url: 'https://sakala.karnataka.gov.in/', category: 'Karnataka', department: 'E-Services' },
  { id: 'ka-egazette', name: 'Karnataka Official e-Gazette', url: 'https://egazette.karnataka.gov.in/', category: 'Karnataka', department: 'Government Gazettes' },
  { id: 'ka-highcourt', name: 'Karnataka High Court Recruitment Board', url: 'https://highcourt.kar.nic.in/', category: 'Karnataka', department: 'Government Gazettes' },
  { id: 'ka-tourism', name: 'Karnataka Tourism Board', url: 'https://karnatakatourism.org/', category: 'Karnataka', department: 'Tourism & Culture' },
  { id: 'ka-industries', name: 'Karnataka Industries Portal (Udyog Mitra)', url: 'https://udyog.karnataka.gov.in/', category: 'Karnataka', department: 'Industries & IT' },
  { id: 'ka-skill-dev', name: 'Karnataka Skill Development Corporation', url: 'https://ksdc.karnataka.gov.in/', category: 'Karnataka', department: 'Employment Services' },

  // --- TAMIL NADU GOVERNMENT WEBSITES ---
  { id: 'tn-portal', name: 'Tamil Nadu State Government Portal', url: 'https://tn.gov.in/', category: 'Tamil Nadu', department: 'Main State Portal' },
  { id: 'tn-english', name: 'Tamil Nadu Gov English Portal', url: 'https://www.tn.gov.in/english', category: 'Tamil Nadu', department: 'Main State Portal' },
  { id: 'tn-cmo', name: 'Tamil Nadu Chief Minister Office', url: 'https://cmo.tn.gov.in/', category: 'Tamil Nadu', department: 'Administration' },
  { id: 'tn-cm-press', name: 'Tamil Nadu CM Press Releases', url: 'https://www.tn.gov.in/press-release', category: 'Tamil Nadu', department: 'Administration' },
  { id: 'tn-news', name: 'Tamil Nadu Gov Latest News', url: 'https://tn.gov.in/news', category: 'Tamil Nadu', department: 'Administration' },
  { id: 'tn-psc', name: 'Tamil Nadu Public Service Commission (TNPSC)', url: 'https://tnpsc.gov.in/', category: 'Tamil Nadu', department: 'Recruitment Board' },
  { id: 'tn-psc-online', name: 'TNPSC Online Application Portal', url: 'https://www.tnpsc.gov.in/online', category: 'Tamil Nadu', department: 'Recruitment Board' },
  { id: 'tn-psc-results', name: 'TNPSC Exam Results Portal', url: 'https://tnpsc.gov.in/results', category: 'Tamil Nadu', department: 'Recruitment Board' },
  { id: 'tn-psc-calendar', name: 'TNPSC Annual Recruitment Exam Calendar', url: 'https://tnpsc.gov.in/exam-calendar', category: 'Tamil Nadu', department: 'Recruitment Board' },
  { id: 'tn-police-dept', name: 'Tamil Nadu Police Department Portal', url: 'https://www.tn.gov.in/departments/0/police', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-police-rec', name: 'Tamil Nadu Police Recruitment Board', url: 'https://tnpolice.gov.in/', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-police-constable', name: 'TN Police Constable Careers', url: 'https://tnpolice.gov.in/en/recruitment.html', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-police-si', name: 'TN Police Sub-Inspector Job Openings', url: 'https://tnpolice.gov.in/en/recruitment.html', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-police-jail', name: 'TN Prison Warder/Jailer Careers', url: 'https://tnpolice.gov.in/en/recruitment.html', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-fire', name: 'Tamil Nadu Fire & Rescue Services Board', url: 'https://tnfireforce.gov.in/', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-trb', name: 'Tamil Nadu Teacher Recruitment Board (TRB)', url: 'https://www.trb.tn.gov.in/', category: 'Tamil Nadu', department: 'Recruitment Board' },
  { id: 'tn-tet', name: 'Tamil Nadu Teacher Eligibility Test (TET)', url: 'https://www.tntet.in/', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-school-edu-syll', name: 'TN School Education Syllabus Board', url: 'https://www.tn.gov.in/departments/9/school-education', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-pgt-tgt', name: 'TN PGT/TGT Teacher Recruitment Board', url: 'https://www.trb.tn.gov.in/', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-school-edu', name: 'Tamil Nadu School Education Department', url: 'https://www.tn.gov.in/departments/9/school-education', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-diploma', name: 'TN Directorate of Technical Education (Diploma)', url: 'https://www.dote.tn.gov.in/', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-health-dept', name: 'TN Health and Family Welfare Portal', url: 'https://www.tn.gov.in/departments/11/health-and-family-welfare', category: 'Tamil Nadu', department: 'Health Department' },
  { id: 'tn-medical-rec', name: 'Tamil Nadu Medical Recruitment Services (MRB)', url: 'https://tnhealth.tn.gov.in/', category: 'Tamil Nadu', department: 'Health Department' },
  { id: 'tn-nursing', name: 'Tamil Nadu Nursing & Midwives Council', url: 'https://tnnursing.tn.gov.in/', category: 'Tamil Nadu', department: 'Health Department' },
  { id: 'tn-dental', name: 'Tamil Nadu Dental Council Board', url: 'https://dental.tn.gov.in/', category: 'Tamil Nadu', department: 'Health Department' },
  { id: 'tn-phc', name: 'TN Community Health Center Services', url: 'https://www.tn.gov.in/departments/11/health-and-family-welfare', category: 'Tamil Nadu', department: 'Health Department' },
  { id: 'tn-health', name: 'Tamil Nadu State Health Department', url: 'https://health.tn.gov.in/', category: 'Tamil Nadu', department: 'Health Department' },
  { id: 'tn-agri-dept', name: 'Tamil Nadu Department of Agriculture', url: 'https://www.tn.gov.in/departments/12/agriculture', category: 'Tamil Nadu', department: 'Agriculture Department' },
  { id: 'tn-horti', name: 'Tamil Nadu Horticulture Department', url: 'https://horticulture.tn.gov.in/', category: 'Tamil Nadu', department: 'Agriculture Department' },
  { id: 'tn-forest', name: 'Tamil Nadu Forest Guard & Warden Recruitment', url: 'https://tnforest.tn.gov.in/', category: 'Tamil Nadu', department: 'Forest & Environment' },
  { id: 'tn-animal-husbandry', name: 'Tamil Nadu Animal Husbandry Board', url: 'https://animalhusbandry.tn.gov.in/', category: 'Tamil Nadu', department: 'Agriculture Department' },
  { id: 'tn-fisheries', name: 'Tamil Nadu Fisheries Department', url: 'https://fisheries.tn.gov.in/', category: 'Tamil Nadu', department: 'Agriculture Department' },
  { id: 'tn-transport-dept', name: 'Tamil Nadu Transport Department Council', url: 'https://www.tn.gov.in/departments/19/transport', category: 'Tamil Nadu', department: 'Transport & Infrastructure' },
  { id: 'tn-prtc', name: 'Pondicherry Road Transport (PRTC Tamil Nadu Link)', url: 'https://tnprt.transport.tn.gov.in/', category: 'Tamil Nadu', department: 'Transport & Infrastructure' },
  { id: 'tn-metro', name: 'Chennai Metro Rail Limited (CMRL)', url: 'https://www.chennaimetrorail.org/', category: 'Tamil Nadu', department: 'Transport & Infrastructure' },
  { id: 'tn-st', name: 'Tamil Nadu State Transport Corporation (SETC)', url: 'https://tnst.transport.tn.gov.in/', category: 'Tamil Nadu', department: 'Transport & Infrastructure' },
  { id: 'tn-tneb', name: 'Tamil Nadu Electricity Board (TNEB)', url: 'https://www.tneb.net/', category: 'Tamil Nadu', department: 'Power Sector' },
  { id: 'tn-tangedco', name: 'TANGEDCO Power Generation Corporation', url: 'https://www.tangedco.gov.in/', category: 'Tamil Nadu', department: 'Power Sector' },
  { id: 'tn-tantransco', name: 'TANTRANSCO Electrical Transmission Board', url: 'https://www.tantransco.gov.in/', category: 'Tamil Nadu', department: 'Power Sector' },
  { id: 'tn-panchayat', name: 'TN Directorate of Panchayat Raj & Rural Dev', url: 'https://www.tn.gov.in/departments/13/panchayat-raj', category: 'Tamil Nadu', department: 'Rural Development' },
  { id: 'tn-nrega', name: 'Tamil Nadu MGNREGA Rural Employment Services', url: 'https://selfre.tn.nic.in/', category: 'Tamil Nadu', department: 'Rural Development' },
  { id: 'tn-rural-dev', name: 'Tamil Nadu Rural Development Agency', url: 'https://www.tn.gov.in/departments/13/panchayat-raj', category: 'Tamil Nadu', department: 'Rural Development' },
  { id: 'tn-revenue', name: 'Tamil Nadu Revenue Department', url: 'https://www.tn.gov.in/departments/1/revenue', category: 'Tamil Nadu', department: 'Revenue & Land Records' },
  { id: 'tn-land-records', name: 'Tamil Nadu Land Records E-Services Block', url: 'https://eservices.tn.gov.in/land', category: 'Tamil Nadu', department: 'Revenue & Land Records' },
  { id: 'tn-registration', name: 'TN Registration & Stamp Duty (TNREGINET)', url: 'https://www.tnreginet.gov.in/', category: 'Tamil Nadu', department: 'Revenue & Land Records' },
  { id: 'tn-eservices', name: 'Tamil Nadu E-Services Single Sign-On', url: 'https://eservices.tn.gov.in/', category: 'Tamil Nadu', department: 'E-Services' },
  { id: 'tn-housing', name: 'Tamil Nadu Housing Board (TNHB)', url: 'https://www.tn.gov.in/departments/7/tamil-nadu-housing-boards', category: 'Tamil Nadu', department: 'Housing & Urban Development' },
  { id: 'tn-municipal', name: 'TN Directorate of Municipal Administration', url: 'https://www.tn.gov.in/departments/14/municipal-administration-and-urban-planning', category: 'Tamil Nadu', department: 'Housing & Urban Development' },
  { id: 'tn-cmda-main', name: 'Chennai Metropolitan Development Authority (CMDA)', url: 'https://cmda.tn.gov.in/', category: 'Tamil Nadu', department: 'Housing & Urban Development' },
  { id: 'tn-cmda-chennai', name: 'CMDA Chennai District Master Plan', url: 'https://cmdachennai.gov.in/', category: 'Tamil Nadu', department: 'Housing & Urban Development' },
  { id: 'tn-finance', name: 'Tamil Nadu Finance Department', url: 'https://www.tn.gov.in/departments/2/finance', category: 'Tamil Nadu', department: 'Administration' },
  { id: 'tn-commercial-tax', name: 'Tamil Nadu Commercial Taxes Division', url: 'https://www.tn.gov.in/departments/3/commercial-tax', category: 'Tamil Nadu', department: 'Administration' },
  { id: 'tn-excise', name: 'Tamil Nadu State Probate and Excise Office', url: 'https://www.tn.gov.in/departments/4/probate-excise', category: 'Tamil Nadu', department: 'Administration' },
  { id: 'tn-scst-welfare', name: 'Tamil Nadu Adi Dravidar and Tribal welfare', url: 'https://www.tn.gov.in/departments/16/communities-welfare', category: 'Tamil Nadu', department: 'Welfare Schemes' },
  { id: 'tn-bc-welfare', name: 'Tamil Nadu BC & MBC Welfare Portal', url: 'https://www.tn.gov.in/departments/16/communities-welfare', category: 'Tamil Nadu', department: 'Welfare Schemes' },
  { id: 'tn-minority-welfare', name: 'Tamil Nadu Minority Welfare Commission', url: 'https://minoritywelfare.tn.gov.in/', category: 'Tamil Nadu', department: 'Welfare Schemes' },
  { id: 'tn-women-child', name: 'Tamil Nadu Social Welfare and Women Empowerment', url: 'https://www.tn.gov.in/departments/15/women-and-child-development', category: 'Tamil Nadu', department: 'Welfare Schemes' },
  { id: 'tn-anganwadi', name: 'Tamil Nadu Anganwadi Direct Recruit Portal', url: 'https://wcd.tn.gov.in/', category: 'Tamil Nadu', department: 'Welfare Schemes' },
  { id: 'tn-disability', name: 'Tamil Nadu Welfare of Differently Abled Persons', url: 'https://www.tn.gov.in/departments/18/social-welfare', category: 'Tamil Nadu', department: 'Welfare Schemes' },
  { id: 'tn-school-edu-main', name: 'TN Directorate of School Education', url: 'https://www.tn.gov.in/departments/9/school-education', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-higher-edu', name: 'Tamil Nadu Higher Education Department', url: 'https://www.tn.gov.in/departments/10/higher-education', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-tech-edu', name: 'Tamil Nadu Department of Technical Education', url: 'https://www.tn.gov.in/departments/8/technical-education', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-tneb-power', name: 'Tamil Nadu Power and Energy Department', url: 'https://www.tn.gov.in/departments/20/power', category: 'Tamil Nadu', department: 'Power Sector' },
  { id: 'tn-board-secondary', name: 'Tamil Nadu Board of Secondary Education', url: 'https://tsse.tn.gov.in/', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-higher-secondary', name: 'Tamil Nadu Higher Secondary Board Details', url: 'https://www.tn.gov.in/departments/9/school-education', category: 'Tamil Nadu', department: 'Education Department' },
  { id: 'tn-police-dept-main', name: 'Tamil Nadu State Police HQ', url: 'https://www.tn.gov.in/departments/0/police', category: 'Tamil Nadu', department: 'Police & Security' },
  { id: 'tn-high-court', name: 'Madras High Court Judicial Recruitment', url: 'https://www.mhc.tn.gov.in/', category: 'Tamil Nadu', department: 'Government Gazettes' },
  { id: 'tn-dist-courts', name: 'Tamil Nadu District Courts Directory', url: 'https://districtcourts.nic.in/', category: 'Tamil Nadu', department: 'Government Gazettes' },
  { id: 'tn-eservices-main', name: 'Tamil Nadu Integrated Citizen Services', url: 'https://eservices.tn.gov.in/', category: 'Tamil Nadu', department: 'E-Services' },
  { id: 'tn-meena', name: 'Tamil Nadu Meena Mission (Meenakshi)', url: 'https://www.tn.gov.in/departments/21/tn-meena-mission', category: 'Tamil Nadu', department: 'E-Services' },
  { id: 'tn-online', name: 'Tamil Nadu Direct Services Gateway', url: 'https://www.tn.gov.in/services', category: 'Tamil Nadu', department: 'E-Services' },
  { id: 'tn-egazette', name: 'Tamil Nadu State e-Gazette Board', url: 'https://www.tn.gov.in/departments/22/government-order', category: 'Tamil Nadu', department: 'Government Gazettes' },
  { id: 'tn-go-portal', name: 'Tamil Nadu Government Orders (GO) Portal', url: 'https://www.tn.gov.in/departments/22/government-order', category: 'Tamil Nadu', department: 'Government Gazettes' },
  { id: 'tn-cooperative', name: 'Tamil Nadu Cooperative Societies Registrar', url: 'https://www.tn.gov.in/departments/23/cooperation', category: 'Tamil Nadu', department: 'Administrative Units' },
  { id: 'tn-industries-dept', name: 'Tamil Nadu Department of Industries', url: 'https://www.tn.gov.in/departments/24/industries', category: 'Tamil Nadu', department: 'Industries & IT' },
  { id: 'tn-employment-exchange', name: 'Tamil Nadu Employment Exchange (Velaivaaippu)', url: 'https://www.tnvelaivaaippu.gov.in/', category: 'Tamil Nadu', department: 'Employment Services' },
  { id: 'tn-private-jobs', name: 'Tamil Nadu Private Sector Job Portal', url: 'https://www.tnprivatejobs.tn.gov.in/', category: 'Tamil Nadu', department: 'Employment Services' },
  { id: 'tn-career-services', name: 'Tamil Nadu Employment Career Services', url: 'https://tamilnaducareerservices.tn.gov.in/', category: 'Tamil Nadu', department: 'Employment Services' },
  { id: 'tn-skill-dev', name: 'Tamil Nadu Skill Development Corporation (TNSDC)', url: 'https://www.tnskill.tn.gov.in/', category: 'Tamil Nadu', department: 'Employment Services' },
  { id: 'tn-tourism', name: 'Tamil Nadu Tourism Development Board', url: 'https://www.tamilnadutourism.tn.gov.in/', category: 'Tamil Nadu', department: 'Tourism & Culture' },
  { id: 'tn-industries', name: 'Tamil Nadu Industries Guidance Portal', url: 'https://www.tn.gov.in/departments/24/industries', category: 'Tamil Nadu', department: 'Industries & IT' },
  { id: 'tn-aavin-milk', name: 'Aavin Milk (Tamil Nadu Co-operative Milk Producers)', url: 'https://aavinmilk.com/', category: 'Tamil Nadu', department: 'Administrative Units' },
  { id: 'tn-tnpl', name: 'Tamil Nadu Newsprint and Papers Limited (TNPL)', url: 'https://tnpl.in/', category: 'Tamil Nadu', department: 'Administrative Units' },
  { id: 'tn-port', name: 'Chennai Port Trust Authority Portal', url: 'https://www.chennaiport.gov.in/', category: 'Tamil Nadu', department: 'Transport & Infrastructure' },
  { id: 'tn-central-univ', name: 'Central University of Tamil Nadu (CUTN) Careers', url: 'https://cutn.ac.in/', category: 'Tamil Nadu', department: 'Education Department' },

  // --- KERALA STATE GOVERNMENT WEBSITES ---
  { id: 'kl-portal', name: 'Kerala State Government Main Portal', url: 'https://kerala.gov.in/', category: 'Kerala', department: 'Main State Portal' },
  { id: 'kl-services', name: 'Kerala Online Services Gateway', url: 'https://kerala.gov.in/en/services', category: 'Kerala', department: 'E-Services' },
  { id: 'kl-orders', name: 'Kerala Gov Government Orders (GO) Portal', url: 'https://kerala.gov.in/en/government-orders', category: 'Kerala', department: 'Government Gazettes' },
  { id: 'kl-psc-main', name: 'Kerala Public Service Commission (KPSC) Main', url: 'https://keralapsc.gov.in/', category: 'Kerala', department: 'Recruitment Board' },
  { id: 'kl-psc-online', name: 'KPSC Thulasi Online Application Portal', url: 'https://thulasi.keralapsc.gov.in/', category: 'Kerala', department: 'Recruitment Board' },
  { id: 'kl-psc-otr', name: 'KPSC One Time Registration System', url: 'https://thulasi.keralapsc.gov.in/otr', category: 'Kerala', department: 'Recruitment Board' },
  { id: 'kl-psc-results', name: 'Kerala PSC Revised & Latest Results', url: 'https://keralapsc.gov.in/revised-result', category: 'Kerala', department: 'Recruitment Board' },
  { id: 'kl-psc-qbank', name: 'Kerala PSC Official Question Bank Archive', url: 'https://keralapsc.gov.in/question-bank', category: 'Kerala', department: 'Recruitment Board' },
  { id: 'kl-psc-calendar', name: 'Kerala PSC Exam/Recruitment Calendar', url: 'https://keralapsc.gov.in/exam-calendar', category: 'Kerala', department: 'Recruitment Board' },
  { id: 'kl-police', name: 'Kerala State Police Head Portal', url: 'https://police.kerala.gov.in/', category: 'Kerala', department: 'Police & Security' },
  { id: 'kl-police-rec', name: 'Kerala Police Recruitment & Active Careers', url: 'https://police.kerala.gov.in/pages/recruitment', category: 'Kerala', department: 'Police & Security' },
  { id: 'kl-police-constable', name: 'Kerala Police Constable Recruit Board', url: 'https://police.kerala.gov.in/pages/recruitment', category: 'Kerala', department: 'Police & Security' },
  { id: 'kl-police-si', name: 'Kerala Police Sub-Inspector Openings', url: 'https://police.kerala.gov.in/pages/recruitment', category: 'Kerala', department: 'Police & Security' },
  { id: 'kl-fire', name: 'Kerala Fire & Rescue Services Directorate', url: 'https://fireandrescue.kerala.gov.in/', category: 'Kerala', department: 'Police & Security' },
  { id: 'kl-psc-tec', name: 'Kerala PSC Technical Examination Center (TEC)', url: 'https://tec.kerala.gov.in/', category: 'Kerala', department: 'Technical Education' },
  { id: 'kl-tec-rec', name: 'Kerala TEC Recruitment Board', url: 'https://tec.kerala.gov.in/', category: 'Kerala', department: 'Technical Education' },
  { id: 'kl-edu', name: 'Kerala School Education Department', url: 'https://education.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-ktet', name: 'Kerala Teacher Eligibility Test (TET) Portal', url: 'https://cet.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-trb', name: 'Kerala Teacher Recruitment Council (TRB)', url: 'https://education.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-school-teachers', name: 'Kerala School Teachers Selection Board', url: 'https://education.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-pgt-tgt', name: 'Kerala PGT/TGT Teacher Deployment Center', url: 'https://education.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-bed', name: 'Kerala B.Ed Admissions & Teacher Selection', url: 'https://dte.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-higher-sec-ed', name: 'Kerala Higher Secondary Education Directorate', url: 'https://edudel.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-health', name: 'Kerala Health and Family Welfare Department', url: 'https://health.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-health-serv', name: 'Kerala Directorate of Health Services (DHS)', url: 'https://healthservices.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-nursing', name: 'Kerala Nurses and Midwives Council Board', url: 'https://nursing.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-dental', name: 'Kerala Dental Council Licensure Board', url: 'https://dental.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-ayush', name: 'Kerala AYUSH Department (Indian Systems of Medicine)', url: 'https://ayush.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-phc', name: 'Kerala Public & Community Health Services (PHC)', url: 'https://health.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-medical-serv', name: 'Kerala Medical Services Corporation Ltd', url: 'https://healthservices.kerala.gov.in/', category: 'Kerala', department: 'Health Department' },
  { id: 'kl-agri', name: 'Kerala Agriculture Development Department', url: 'https://agriculture.kerala.gov.in/', category: 'Kerala', department: 'Agriculture Department' },
  { id: 'kl-horti', name: 'State Horticulture Mission Kerala', url: 'https://horticulture.kerala.gov.in/', category: 'Kerala', department: 'Agriculture Department' },
  { id: 'kl-forest', name: 'Kerala Forest and Wildlife Department', url: 'https://forest.kerala.gov.in/', category: 'Kerala', department: 'Forest & Environment' },
  { id: 'kl-animal-husbandry', name: 'Kerala Animal Husbandry Department Services', url: 'https://ah.kerala.gov.in/', category: 'Kerala', department: 'Agriculture Department' },
  { id: 'kl-fisheries', name: 'Kerala Fisheries Department Recruitment', url: 'https://fisheries.kerala.gov.in/', category: 'Kerala', department: 'Agriculture Department' },
  { id: 'kl-coir', name: 'Coir Board of Kerala (Coir Products & Export)', url: 'https://coirboard.gov.in/', category: 'Kerala', department: 'Administrative Units' },
  { id: 'kl-rubber', name: 'The Rubber Board India (Kerala HQ Careers)', url: 'https://rubberboard.org.in/', category: 'Kerala', department: 'Administrative Units' },
  { id: 'kl-transport', name: 'Kerala Motor Vehicles & Transport Board', url: 'https://transport.kerala.gov.in/', category: 'Kerala', department: 'Transport & Infrastructure' },
  { id: 'kl-ksrtc', name: 'Kerala State Road Transport Corporation (KSRTC)', url: 'https://www.ksrtc.in/', category: 'Kerala', department: 'Transport & Infrastructure' },
  { id: 'kl-ksrtc-jobs', name: 'KSRTC Careers & Recruitment Cell', url: 'https://www.ksrtc.in/jobs', category: 'Kerala', department: 'Transport & Infrastructure' },
  { id: 'kl-kseb', name: 'Kerala State Electricity Board (KSEB)', url: 'https://kseb.in/', category: 'Kerala', department: 'Power Sector' },
  { id: 'kl-kseb-careers', name: 'KSEB Careers & Systems Engineer Openings', url: 'https://kseb.in/careers', category: 'Kerala', department: 'Power Sector' },
  { id: 'kl-pwd', name: 'Kerala Public Works Department (PWD)', url: 'https://pwd.kerala.gov.in/', category: 'Kerala', department: 'Transport & Infrastructure' },
  { id: 'kl-lsg', name: 'Kerala Local Self Government Department (LSGD)', url: 'https://lsgkerala.gov.in/', category: 'Kerala', department: 'Rural Development' },
  { id: 'kl-panchayat', name: 'Kerala Panchayat Raj Department Main', url: 'https://lsgkerala.gov.in/', category: 'Kerala', department: 'Rural Development' },
  { id: 'kl-nrega', name: 'Kerala MGNREGA Mahatma Gandhi Rural Jobs', url: 'https://keralamgnrega.gov.in/', category: 'Kerala', department: 'Rural Development' },
  { id: 'kl-rural-dev', name: 'Kerala Commissionerate of Rural Development', url: 'https://lsgkerala.gov.in/', category: 'Kerala', department: 'Rural Development' },
  { id: 'kl-kudumbashree', name: 'Kudumbashree State Poverty Eradication Mission', url: 'https://kudumbashree.org/', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-revenue', name: 'Kerala State Revenue Department', url: 'https://revenue.kerala.gov.in/', category: 'Kerala', department: 'Revenue & Land Records' },
  { id: 'kl-land-records', name: 'Kerala Survey and Land Records Directorate', url: 'https://landrecords.kerala.gov.in/', category: 'Kerala', department: 'Revenue & Land Records' },
  { id: 'kl-registration', name: 'Kerala Registration Department (IGR)', url: 'https://igr.kerala.gov.in/', category: 'Kerala', department: 'Revenue & Land Records' },
  { id: 'kl-edistrict', name: 'Kerala e-District Portal Administration', url: 'https://edistrict.kerala.gov.in/', category: 'Kerala', department: 'E-Services' },
  { id: 'kl-esevana', name: 'Kerala e-Sevana Citizen Services Unified', url: 'https://esavana.kerala.gov.in/', category: 'Kerala', department: 'E-Services' },
  { id: 'kl-housing', name: 'Kerala State Housing Board (KSHB)', url: 'https://housing.kerala.gov.in/', category: 'Kerala', department: 'Housing & Urban Development' },
  { id: 'kl-kmtpwd', name: 'Kerala Motor Transport Workers Welfare Board', url: 'https://kmtpwd.kerala.gov.in/', category: 'Kerala', department: 'Social Security' },
  { id: 'kl-municipal', name: 'Kerala Municipalities and Corporations Council', url: 'https://municipalities.kerala.gov.in/', category: 'Kerala', department: 'Housing & Urban Development' },
  { id: 'kl-cdd', name: 'Kerala City Development & Urban Dev Department', url: 'https://udd.kerala.gov.in/', category: 'Kerala', department: 'Housing & Urban Development' },
  { id: 'kl-finance', name: 'Kerala State Finance Department', url: 'https://finance.kerala.gov.in/', category: 'Kerala', department: 'Administration' },
  { id: 'kl-ctax', name: 'Kerala State Commercial Taxes Division (SGST)', url: 'https://ctax.kerala.gov.in/', category: 'Kerala', department: 'Administration' },
  { id: 'kl-excise', name: 'Kerala Excise Department (Enforcement Bureau)', url: 'https://excise.kerala.gov.in/', category: 'Kerala', department: 'Administration' },
  { id: 'kl-scst-welfare', name: 'Scheduled Castes & Scheduled Tribes Dev Kerala', url: 'https://dstw.kerala.gov.in/', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-bc-welfare', name: 'Kerala Backward Classes Development Department', url: 'https://bcwelfare.kerala.gov.in/', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-minority-welfare', name: 'Kerala Minority Welfare Department', url: 'https://minoritywelfare.kerala.gov.in/', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-wcd', name: 'Kerala Women and Child Development Department', url: 'https://wcd.kerala.gov.in/', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-anganwadi', name: 'Kerala Anganwadi Direct Recruit Portal', url: 'https://wcd.kerala.gov.in/anganwadi', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-justice', name: 'Kerala Social Justice Department', url: 'https://sj.kerala.gov.in/', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-disability', name: 'Kerala Welfare Barrier-Free Disability Board', url: 'https://disability.kerala.gov.in/', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-elderly', name: 'Kerala Senior Citizens Welfare Portal', url: 'https://wcd.kerala.gov.in/elderly', category: 'Kerala', department: 'Welfare Schemes' },
  { id: 'kl-higher-edu', name: 'Kerala Higher Education Department (Admissions)', url: 'https://he.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-dte', name: 'Kerala Department of Technical Education', url: 'https://dte.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-board', name: 'Kerala Board of Secondary Examinations (SSLC)', url: 'https://bse.kerala.gov.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-university', name: 'University of Kerala Academic Careers', url: 'https://ku.ac.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-cec', name: 'Kerala Continuing Education Center Board (CEC)', url: 'https://cec-klr.in/', category: 'Kerala', department: 'Education Department' },
  { id: 'kl-high-court', name: 'High Court of Kerala Judicial Recruitment', url: 'https://highcourt.kerala.gov.in/', category: 'Kerala', department: 'Government Gazettes' },
  { id: 'kl-dist-courts', name: 'Kerala Local and District Courts Matrix', url: 'https://districtcourts.nic.in/', category: 'Kerala', department: 'Government Gazettes' },
  { id: 'kl-asap', name: 'Additional Skill Acquisition Programme (ASAP Kerala)', url: 'https://asap.kerala.gov.in/', category: 'Kerala', department: 'Employment Services' },
  { id: 'kl-norka', name: 'NORKA Roots (Non-Resident Keralites Placement)', url: 'https://norkaroots.org/', category: 'Kerala', department: 'Employment Services' },
  { id: 'kl-egazette', name: 'Kerala State e-Gazette Board', url: 'https://keralagazette.gov.in/', category: 'Kerala', department: 'Government Gazettes' },
  { id: 'kl-cooperative', name: 'Kerala Cooperative Societies Department Registrar', url: 'https://cooperation.kerala.gov.in/', category: 'Kerala', department: 'Administrative Units' },
  { id: 'kl-coop-bank', name: 'Kerala State Co-operative Bank (Kerala Bank)', url: 'https://keralacoopbank.org/', category: 'Kerala', department: 'Administrative Units' },
  { id: 'kl-industries', name: 'Kerala Directorate of Industries and Commerce', url: 'https://industries.kerala.gov.in/', category: 'Kerala', department: 'Industries & IT' },
  { id: 'kl-startup', name: 'Kerala Startup Mission (KSUM)', url: 'https://startupmission.kerala.gov.in/', category: 'Kerala', department: 'Industries & IT' },
  { id: 'kl-trade', name: 'Kerala State Trade Promotion Board', url: 'https://keralatrade.gov.in/', category: 'Kerala', department: 'Industries & IT' },
  { id: 'kl-tourism', name: 'Kerala State Department of Tourism', url: 'https://www.keralatourism.org/', category: 'Kerala', department: 'Tourism & Culture' },
  { id: 'kl-skill-dev', name: 'Kerala Skill Development Corporation', url: 'https://ksdc.karnataka.gov.in/', category: 'Kerala', department: 'Employment Services' },
  { id: 'kl-ikm', name: 'Information Kerala Mission (IKM)', url: 'https://ikm.gov.in/', category: 'Kerala', department: 'E-Governance' },
  { id: 'kl-cmd', name: 'Centre for Management Development (CMD Kerala)', url: 'https://cmd.kerala.gov.in/', category: 'Kerala', department: 'Employment Services' },
  { id: 'kl-pses', name: 'Kerala Public Sector Enterprise Selection Board', url: 'https://jobs.kpesrb.kerala.gov.in/', category: 'Kerala', department: 'Employment Services' },

  // --- UTTAR PRADESH GOVERNMENT WEBSITES ---
  { id: 'up-portal', name: 'Uttar Pradesh State Government Portal', url: 'https://up.gov.in/', category: 'Uttar Pradesh', department: 'Main State Portal' },
  { id: 'up-nic-portal', name: 'UP National Informatics Centre Portal', url: 'https://up.nic.in/', category: 'Uttar Pradesh', department: 'Main State Portal' },
  { id: 'up-cmo', name: 'UP Chief Minister Office (CMO)', url: 'https://cmo.up.nic.in/', category: 'Uttar Pradesh', department: 'Administration' },
  { id: 'up-news-pr', name: 'UP CM Press Releases Dispatch', url: 'https://up.gov.in/en/news', category: 'Uttar Pradesh', department: 'Main State Portal' },
  { id: 'up-psc', name: 'Uttar Pradesh Public Service Commission (UPPSC)', url: 'https://uppsc.up.nic.in/', category: 'Uttar Pradesh', department: 'Recruitment Board' },
  { id: 'up-psc-direct', name: 'UPPSC Direct Recruitment Portal', url: 'https://uppsc.up.nic.in/OuterPages/Other_PSC.aspx', category: 'Uttar Pradesh', department: 'Recruitment Board' },
  { id: 'up-sssc', name: 'UP Subordinate Services Selection Commission (UPSSSC)', url: 'https://upsssc.gov.in/', category: 'Uttar Pradesh', department: 'Recruitment Board' },
  { id: 'up-sssc-pet', name: 'UPSSSC Preliminary Eligibility Test (PET)', url: 'https://upsssc.gov.in/', category: 'Uttar Pradesh', department: 'Recruitment Board' },
  { id: 'up-pst', name: 'UP Preliminary Screening Test (PST) Board', url: 'https://upsssc.gov.in/', category: 'Uttar Pradesh', department: 'Recruitment Board' },
  { id: 'up-police', name: 'Uttar Pradesh Police Headquarters Main', url: 'https://uppolice.gov.in/', category: 'Uttar Pradesh', department: 'Police & Security' },
  { id: 'up-police-rec', name: 'UP Police Recruitment & Promotion Board', url: 'https://uppbpb.gov.in/', category: 'Uttar Pradesh', department: 'Police & Security' },
  { id: 'up-police-constable', name: 'UP Police Constable Active Recruitment', url: 'https://uppbpb.gov.in/', category: 'Uttar Pradesh', department: 'Police & Security' },
  { id: 'up-police-si', name: 'UP Police Sub-Inspector Openings', url: 'https://uppbpb.gov.in/', category: 'Uttar Pradesh', department: 'Police & Security' },
  { id: 'up-police-head-const', name: 'UP Police Head Constable Cell', url: 'https://uppbpb.gov.in/', category: 'Uttar Pradesh', department: 'Police & Security' },
  { id: 'up-teachers', name: 'UP Secondary Education Recruitment (UPES)', url: 'https://upes.up.nic.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-tet', name: 'UP Teacher Eligibility Test (TET) Board', url: 'https://upchet.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-bed-admit', name: 'Uttar Pradesh B.Ed Admission Cell', url: 'https://upchet.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-pgt-tgt', name: 'UP PGT/TGT Teacher Deployment Portal', url: 'https://uppgt.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-basic-edu', name: 'UP Directorate of Basic School Education', url: 'https://basiceducation.up.gov.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-higher-edu', name: 'UP Higher Education Department System', url: 'https://highereducation.up.gov.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-degree-col', name: 'UP Government Degree Colleges Directory', url: 'https://dce.up.gov.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-health', name: 'UP Health and Family Welfare Directorate', url: 'https://health.up.gov.in/', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-medical', name: 'Uttar Pradesh Medical Education and Training', url: 'https://medical.up.gov.in/', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-nursing', name: 'Uttar Pradesh Nurses and Midwives Council', url: 'https://upnr.nic.in/', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-ayush', name: 'Uttar Pradesh AYUSH Department Admissions', url: 'https://ayush.up.gov.in/', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-nhsrc', name: 'Uttar Pradesh National Health Resource Cell (NHSRC)', url: 'https://upnhsrc.in/', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-hmo', name: 'UP Medical Health Officer Recruitment Board', url: 'https://upnhsrc.in/', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-agriculture', name: 'Uttar Pradesh Department of Agriculture', url: 'https://agri.up.nic.in/', category: 'Uttar Pradesh', department: 'Agriculture Department' },
  { id: 'up-horticulture', name: 'UP Directorate of Horticulture and Food', url: 'https://horticulture.up.gov.in/', category: 'Uttar Pradesh', department: 'Agriculture Department' },
  { id: 'up-forest', name: 'Uttar Pradesh Forest and Wildlife Department', url: 'https://forest.up.gov.in/', category: 'Uttar Pradesh', department: 'Forest & Environment' },
  { id: 'up-animal-husbandry', name: 'Uttar Pradesh Animal Husbandry Department', url: 'https://ah.up.nic.in/', category: 'Uttar Pradesh', department: 'Agriculture Department' },
  { id: 'up-fisheries', name: 'Uttar Pradesh Fisheries Development Board', url: 'https://fisheries.up.gov.in/', category: 'Uttar Pradesh', department: 'Agriculture Department' },
  { id: 'up-transport', name: 'Uttar Pradesh Motor Vehicles & Transport', url: 'https://transport.up.nic.in/', category: 'Uttar Pradesh', department: 'Transport & Infrastructure' },
  { id: 'up-srtc', name: 'Uttar Pradesh State Road Transport Corp (UPSRTC)', url: 'https://upsrtc.up.nic.in/', category: 'Uttar Pradesh', department: 'Transport & Infrastructure' },
  { id: 'up-srtc-careers', name: 'UPSRTC Active Careers & Crew Openings', url: 'https://upsrtc.up.nic.in/careers', category: 'Uttar Pradesh', department: 'Transport & Infrastructure' },
  { id: 'up-power-dept', name: 'Uttar Pradesh Department of Power', url: 'https://power.up.gov.in/', category: 'Uttar Pradesh', department: 'Power Sector' },
  { id: 'up-pcl', name: 'Uttar Pradesh Power Corporation Limited (UPPCL)', url: 'https://uppcionline.com/', category: 'Uttar Pradesh', department: 'Power Sector' },
  { id: 'up-pcl-ae', name: 'UPPCL Assistant Engineer Recruitment', url: 'https://uppcionline.com/', category: 'Uttar Pradesh', department: 'Power Sector' },
  { id: 'up-pdcl', name: 'UP Power Distribution Corporation (UPPDCL)', url: 'https://uqpcl.co.in/', category: 'Uttar Pradesh', department: 'Power Sector' },
  { id: 'up-santransco', name: 'UP State Power Transmission Co (UPSANTRANSCO)', url: 'https://upstcl.co.in/', category: 'Uttar Pradesh', department: 'Power Sector' },
  { id: 'up-panchayat', name: 'Uttar Pradesh Panchayat Raj Department', url: 'https://panchayat.up.gov.in/', category: 'Uttar Pradesh', department: 'Rural Development' },
  { id: 'up-nrega', name: 'MGNREGA Uttar Pradesh Job Card Portal', url: 'https://nrega.up.gov.in/', category: 'Uttar Pradesh', department: 'Rural Development' },
  { id: 'up-rural-dev', name: 'Uttar Pradesh Rural Development Commission', url: 'https://rd.up.gov.in/', category: 'Uttar Pradesh', department: 'Rural Development' },
  { id: 'up-rural-road', name: 'UP Rural Road Development Agency', url: 'https://pwnr.up.gov.in/', category: 'Uttar Pradesh', department: 'Rural Development' },
  { id: 'up-revenue', name: 'Uttar Pradesh Revenue Department Portal', url: 'https://revenue.up.nic.in/', category: 'Uttar Pradesh', department: 'Revenue & Land Records' },
  { id: 'up-revenue-board', name: 'Uttar Pradesh Revenue Board Administration', url: 'https://revenue.up.nic.in/', category: 'Uttar Pradesh', department: 'Revenue & Land Records' },
  { id: 'up-land-records', name: 'Uttar Pradesh Bhulekh Land Records (Bhumi)', url: 'https://upbhumi.up.nic.in/', category: 'Uttar Pradesh', department: 'Revenue & Land Records' },
  { id: 'up-registration', name: 'Uttar Pradesh Stamp and Registration (IGRSIP)', url: 'https://upregistration.gov.in/', category: 'Uttar Pradesh', department: 'Revenue & Land Records' },
  { id: 'up-state-portal-land', name: 'UP State Land Records Master Gateway', url: 'https://landrecords.up.nic.in/', category: 'Uttar Pradesh', department: 'Revenue & Land Records' },
  { id: 'up-housing', name: 'Uttar Pradesh Housing & Urban Planning Board', url: 'https://housing.up.gov.in/', category: 'Uttar Pradesh', department: 'Housing & Urban Development' },
  { id: 'up-awas', name: 'UP Awas Vikas Parishad (UPAVP Housing)', url: 'https://upawas.up.nic.in/', category: 'Uttar Pradesh', department: 'Housing & Urban Development' },
  { id: 'up-municipal', name: 'UP Urban Local Bodies & Municipalities Board', url: 'https://municipal.up.gov.in/', category: 'Uttar Pradesh', department: 'Housing & Urban Development' },
  { id: 'up-nigam', name: 'Uttar Pradesh Jal/Nagar Nigam Board', url: 'https://nigam.up.gov.in/', category: 'Uttar Pradesh', department: 'Housing & Urban Development' },
  { id: 'up-industrial', name: 'UP State Industrial Development Authority', url: 'https://inu.up.nic.in/', category: 'Uttar Pradesh', department: 'Housing & Urban Development' },
  { id: 'up-finance', name: 'Uttar Pradesh Finance Department', url: 'https://finance.up.gov.in/', category: 'Uttar Pradesh', department: 'Administration' },
  { id: 'up-commercial-tax', name: 'UP Commercial Taxes (UPCET) Department', url: 'https://upcet.gov.in/', category: 'Uttar Pradesh', department: 'Administration' },
  { id: 'up-excise', name: 'Uttar Pradesh Excise Department Portal', url: 'https://excise.up.gov.in/', category: 'Uttar Pradesh', department: 'Administration' },
  { id: 'up-food-fss', name: 'UP Food Safety and Drug Administration (FSS)', url: 'https://fss.up.nic.in/', category: 'Uttar Pradesh', department: 'Administration' },
  { id: 'up-scst-welfare', name: 'UP Department of Scheduled Castes/Tribes Welfare', url: 'https://stwelfare.up.gov.in/', category: 'Uttar Pradesh', department: 'Welfare Schemes' },
  { id: 'up-bc-welfare', name: 'UP Backward Classes Development Welfare', url: 'https://bcwelfare.up.gov.in/', category: 'Uttar Pradesh', department: 'Welfare Schemes' },
  { id: 'up-minority-welfare', name: 'UP Minority Welfare & Waqf Board', url: 'https://minorityup.gov.in/', category: 'Uttar Pradesh', department: 'Welfare Schemes' },
  { id: 'up-wcd', name: 'UP Women and Child Development System', url: 'https://wcd.up.gov.in/', category: 'Uttar Pradesh', department: 'Welfare Schemes' },
  { id: 'up-anganwadi', name: 'UP Anganwadi Direct Recruit Portal', url: 'https://wcd.up.gov.in/anganwadi', category: 'Uttar Pradesh', department: 'Welfare Schemes' },
  { id: 'up-social-welfare', name: 'Uttar Pradesh Social Welfare Department', url: 'https://socialwelfare.up.gov.in/', category: 'Uttar Pradesh', department: 'Welfare Schemes' },
  { id: 'up-disability', name: 'UP Welfare of Differently Abled Persons', url: 'https://disability.up.gov.in/', category: 'Uttar Pradesh', department: 'Welfare Schemes' },
  { id: 'up-tech-edu', name: 'UP Department of Technical Education', url: 'https://uptech.up.nic.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-board-secondary', name: 'UP Board of Secondary Education (UPBose)', url: 'https://upbose.org/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-university', name: 'MyUP State Universities Placement Portal', url: 'https://myup.gov.in/', category: 'Uttar Pradesh', department: 'Education Department' },
  { id: 'up-high-court', name: 'Allahabad High Court Judicial Recruitment (HCIL)', url: 'https://hcil.nic.in/', category: 'Uttar Pradesh', department: 'Government Gazettes' },
  { id: 'up-dist-courts', name: 'Uttar Pradesh Local District Courts Directory', url: 'https://districtcourts.nic.in/', category: 'Uttar Pradesh', department: 'Government Gazettes' },
  { id: 'up-online-services', name: 'UP Unified Online Citizen Services', url: 'https://up.gov.in/en/services', category: 'Uttar Pradesh', department: 'E-Services' },
  { id: 'up-seva-kendra', name: 'Sewayojan UP Employment Services Gateway', url: 'https://sewayojan.up.nic.in/', category: 'Uttar Pradesh', department: 'Employment Services' },
  { id: 'up-edistrict', name: 'Uttar Pradesh e-District Administration', url: 'https://edistrict.up.gov.in/', category: 'Uttar Pradesh', department: 'E-Services' },
  { id: 'up-eoffice', name: 'Uttar Pradesh Unified e-Office Portal', url: 'https://eoffice.up.nic.in/', category: 'Uttar Pradesh', department: 'E-Services' },
  { id: 'up-egazette', name: 'Uttar Pradesh State e-Gazette Board', url: 'https://upgovportal.gov.in/', category: 'Uttar Pradesh', department: 'Government Gazettes' },
  { id: 'up-cooperative', name: 'Uttar Pradesh Cooperative Societies Registrar', url: 'https://cooperation.up.nic.in/', category: 'Uttar Pradesh', department: 'Administrative Units' },
  { id: 'up-bank', name: 'Uttar Pradesh State Co-operative Bank Hub', url: 'https://upbank.co.in/', category: 'Uttar Pradesh', department: 'Administrative Units' },
  { id: 'up-industries-dept', name: 'Uttar Pradesh Directorate of Industries', url: 'https://industries.up.gov.in/', category: 'Uttar Pradesh', department: 'Industries & IT' },
  { id: 'up-msme', name: 'Uttar Pradesh MSME Development Commission', url: 'https://msme.up.nic.in/', category: 'Uttar Pradesh', department: 'Industries & IT' },
  { id: 'up-trade-promo', name: 'Uttar Pradesh Export & Trade Promotion Board', url: 'https://trade.up.gov.in/', category: 'Uttar Pradesh', department: 'Industries & IT' },
  { id: 'up-rojgaar-sangam', name: 'Rojgaar Sangam Employment Portal', url: 'https://rojgaarsangam.up.gov.in/', category: 'Uttar Pradesh', department: 'Employment Services' },
  { id: 'up-skill-dev', name: 'UP Skill Development - Udhyam Portal', url: 'https://udhyam.up.gov.in/', category: 'Uttar Pradesh', department: 'Employment Services' },
  { id: 'up-tourism', name: 'Uttar Pradesh State Tourism Development Board', url: 'https://tourism.up.gov.in/', category: 'Uttar Pradesh', department: 'Tourism & Culture' },
  { id: 'up-sports', name: 'Uttar Pradesh Directorate of Sports & Youth', url: 'https://sports.up.gov.in/', category: 'Uttar Pradesh', department: 'Tourism & Culture' },
  { id: 'up-information', name: 'UP Information & Public Relations (IPR)', url: 'https://ipr.up.nic.in/', category: 'Uttar Pradesh', department: 'E-Governance' },
  { id: 'up-amc', name: 'UP Municipal Employees Administration (UPAMC)', url: 'https://upamc.up.nic.in/', category: 'Uttar Pradesh', department: 'Administrative Units' },
  { id: 'up-karmachari', name: 'Uttar Pradesh State Employees Welfare Portal', url: 'https://upkarmachari.up.nic.in/', category: 'Uttar Pradesh', department: 'Administrative Units' },
  { id: 'up-kgmu-medical', name: 'King Georges Medical University (KGMU) Careers', url: 'https://kgmu.up.nic.in/', category: 'Uttar Pradesh', department: 'Health Department' },
  { id: 'up-governor', name: 'Uttar Pradesh Governor Secretariat Portal', url: 'https://gov.up.nic.in/', category: 'Uttar Pradesh', department: 'Administration' },

  // --- MAHARASHTRA GOVERNMENT WEBSITES ---
  // Main & Portals
  { id: 'mh-portal', name: 'Maharashtra State Government Portal', url: 'https://maharashtra.gov.in/', category: 'Maharashtra', department: 'Main State Portal' },
  { id: 'mh-portal-marathi', name: 'Maharashtra State Portal (Marathi)', url: 'https://maharashtra.gov.in/Site/Marathi/Homepage', category: 'Maharashtra', department: 'Main State Portal' },
  { id: 'mh-cmo', name: 'Maharashtra Chief Minister Office (CMO)', url: 'https://cmo.maharashtra.gov.in/', category: 'Maharashtra', department: 'Administration' },
  { id: 'mh-cm-decisions', name: 'Maharashtra Government Decisions (Press Releases)', url: 'https://maharashtra.gov.in/Site/Main-Pages/Government-Decisions', category: 'Maharashtra', department: 'Administration' },
  { id: 'mh-latest-news', name: 'Maharashtra Latest News Portal', url: 'https://maharashtra.gov.in/Site/Main-Pages/News', category: 'Maharashtra', department: 'Administration' },
  { id: 'mh-nic', name: 'NIC Maharashtra Information Centre', url: 'https://maharashtra.gov.in/', category: 'Maharashtra', department: 'E-Governance' },

  // MPSC
  { id: 'mh-psc', name: 'Maharashtra Public Service Commission (MPSC)', url: 'https://mpsc.maharashtra.gov.in/', category: 'Maharashtra', department: 'Recruitment Board' },
  { id: 'mh-psc-online', name: 'MPSC Online Applications', url: 'https://online.maharashtra.gov.in/', category: 'Maharashtra', department: 'Recruitment Board' },
  { id: 'mh-psc-results', name: 'MPSC Exam & Recruitment Results', url: 'https://mpsc.maharashtra.gov.in/results', category: 'Maharashtra', department: 'Recruitment Board' },
  { id: 'mh-psc-calendar', name: 'MPSC Official Exam Calendar', url: 'https://mpsc.maharashtra.gov.in/exam-calendar', category: 'Maharashtra', department: 'Recruitment Board' },
  { id: 'mh-mpsc-apply', name: 'MPSC Direct Application System', url: 'https://online.maharashtra.gov.in/', category: 'Maharashtra', department: 'Recruitment Board' },

  // Police & Law
  { id: 'mh-police', name: 'Maharashtra State Police HQ', url: 'https://mahapolice.maharashtra.gov.in/', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-police-rec', name: 'Maharashtra Police Official Recruitment Cell', url: 'https://mahapolice.maharashtra.gov.in/en/recruitment', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-police-constable', name: 'Maharashtra Police Constable Careers', url: 'https://mahapolice.maharashtra.gov.in/en/recruitment', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-police-si', name: 'Maharashtra Police Sub-Inspector Openings', url: 'https://mahapolice.maharashtra.gov.in/en/recruitment', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-police-head-const', name: 'Maharashtra Police Head Constable Desk', url: 'https://mahapolice.maharashtra.gov.in/en/recruitment', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-fire-force', name: 'Maharashtra Fire Force & Safety Directorate', url: 'https://maharashtra.gov.in/Site/Departments/Home-Department/Departments/Police', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-mumbai-police', name: 'Greater Mumbai Police Department Portal', url: 'https://www.mumbai.gov.in/', category: 'Maharashtra', department: 'Police & Security' },
  { id: 'mh-high-court', name: 'Bombay High Court Judicial Recruitment', url: 'https://bombayhighcourt.nic.in/', category: 'Maharashtra', department: 'Government Gazettes' },
  { id: 'mh-dist-courts', name: 'Maharashtra Local District Courts System', url: 'https://districtcourts.nic.in/', category: 'Maharashtra', department: 'Government Gazettes' },
  { id: 'mh-acb', name: 'Maharashtra Anti-Corruption Bureau (ACB)', url: 'https://acb.maharashtra.gov.in/', category: 'Maharashtra', department: 'Police & Security' },

  // Education
  { id: 'mh-education', name: 'Maharashtra General Education Department', url: 'https://education.maharashtra.gov.in/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-tet', name: 'Maharashtra Teacher Eligibility Test (TET)', url: 'https://maharashtra.gov.in/Site/Departments/School-Education', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-trb', name: 'Maharashtra Teacher Recruitment Board (TRB)', url: 'https://education.maharashtra.gov.in/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-pgt-tgt', name: 'Maharashtra PGT/TGT Teacher Deployment', url: 'https://education.maharashtra.gov.in/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-teachers-list', name: 'Maharashtra School Teachers Panel', url: 'https://education.maharashtra.gov.in/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-bed-admit', name: 'Maharashtra B.Ed Technical Admissions', url: 'https://dte.maharashtra.gov.in/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-higher-sec', name: 'Maharashtra Higher Secondary Education', url: 'https://maharashtra.gov.in/Site/Departments/Higher-Education', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-higher-edu', name: 'Maharashtra Higher Education Portal', url: 'https://he.maharashtra.gov.in/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-tech-edu', name: 'Maharashtra Directorate of Technical Education', url: 'https://dte.maharashtra.gov.in/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-board', name: 'Maharashtra State Board of Secondary Education', url: 'https://maharashtraboards.org/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-msbshse', name: 'MSBSHSE Board Examinations Portal', url: 'https://maharashtraboards.org/', category: 'Maharashtra', department: 'Education Department' },
  { id: 'mh-university', name: 'Mumbai University Placement & Careers', url: 'https://mu.ac.in/', category: 'Maharashtra', department: 'Education Department' },

  // Health
  { id: 'mh-health', name: 'Maharashtra Public Health Department', url: 'https://health.maharashtra.gov.in/', category: 'Maharashtra', department: 'Health Department' },
  { id: 'mh-medical-services', name: 'Maharashtra Directorate of Health Services', url: 'https://healthservices.maharashtra.gov.in/', category: 'Maharashtra', department: 'Health Department' },
  { id: 'mh-nursing', name: 'Maharashtra Nursing and Midwives Council', url: 'https://nursing.maharashtra.gov.in/', category: 'Maharashtra', department: 'Health Department' },
  { id: 'mh-dental', name: 'Maharashtra Dental Council Licensure Board', url: 'https://dental.maharashtra.gov.in/', category: 'Maharashtra', department: 'Health Department' },
  { id: 'mh-ayush', name: 'Maharashtra State AYUSH Directorate', url: 'https://ayush.maharashtra.gov.in/', category: 'Maharashtra', department: 'Health Department' },
  { id: 'mh-phc', name: 'Maharashtra Primary Health Care (PHC/CHC)', url: 'https://health.maharashtra.gov.in/', category: 'Maharashtra', department: 'Health Department' },

  // Agriculture
  { id: 'mh-agri', name: 'Maharashtra Agriculture Department', url: 'https://agriculture.maharashtra.gov.in/', category: 'Maharashtra', department: 'Agriculture Department' },
  { id: 'mh-horticulture', name: 'Maharashtra Directorate of Horticulture', url: 'https://horticulture.maharashtra.gov.in/', category: 'Maharashtra', department: 'Agriculture Department' },
  { id: 'mh-forest', name: 'Maharashtra Forest and Wildlife Department', url: 'https://forest.maharashtra.gov.in/', category: 'Maharashtra', department: 'Forest & Environment' },
  { id: 'mh-animal-husbandry', name: 'Maharashtra Animal Husbandry Services', url: 'https://ah.maharashtra.gov.in/', category: 'Maharashtra', department: 'Agriculture Department' },
  { id: 'mh-fisheries', name: 'Maharashtra Fisheries Department', url: 'https://fisheries.maharashtra.gov.in/', category: 'Maharashtra', department: 'Agriculture Department' },
  { id: 'mh-soil-cons', name: 'Maharashtra Soil Conservation Joint Director', url: 'https://soilconservation.maharashtra.gov.in/', category: 'Maharashtra', department: 'Agriculture Department' },

  // Transport
  { id: 'mh-transport', name: 'Maharashtra Motor Vehicles & Transport', url: 'https://transport.maharashtra.gov.in/', category: 'Maharashtra', department: 'Transport & Infrastructure' },
  { id: 'mh-msrtc', name: 'Maharashtra State Road Transport (MSRTC)', url: 'https://msrtc.maharashtra.gov.in/', category: 'Maharashtra', department: 'Transport & Infrastructure' },
  { id: 'mh-msrtc-careers', name: 'MSRTC Careers and Recruitments Desk', url: 'https://msrtc.maharashtra.gov.in/careers', category: 'Maharashtra', department: 'Transport & Infrastructure' },

  // Energy & Power
  { id: 'mh-vitaran', name: 'MahaVitaran (Maharashtra State Electricity)', url: 'https://www.mahadiscom.in/en/home/', category: 'Maharashtra', department: 'Power Sector' },
  { id: 'mh-front', name: 'MahaFront Power Enterprise Gate', url: 'https://mahafront.com/', category: 'Maharashtra', department: 'Power Sector' },
  { id: 'mh-mseb', name: 'MSEB State Power Holding Company', url: 'https://mseb.maharashtra.gov.in/', category: 'Maharashtra', department: 'Power Sector' },
  { id: 'mh-power-dept', name: 'Maharashtra Department of Power', url: 'https://power.maharashtra.gov.in/', category: 'Maharashtra', department: 'Power Sector' },

  // Panchayat Raj
  { id: 'mh-panchayat', name: 'Maharashtra Panchayat Raj Department', url: 'https://panchayat.maharashtra.gov.in/', category: 'Maharashtra', department: 'Rural Development' },
  { id: 'mh-nrega', name: 'MGNREGA Maharashtra Job Card Desk', url: 'https://nrega.maharashtra.gov.in/', category: 'Maharashtra', department: 'Rural Development' },
  { id: 'mh-rural-dev', name: 'Maharashtra Rural Development Commission', url: 'https://rd.maharashtra.gov.in/', category: 'Maharashtra', department: 'Rural Development' },
  { id: 'mh-gramin', name: 'Maharashtra Gramin Unified Portal', url: 'https://gramin.maharashtra.gov.in/', category: 'Maharashtra', department: 'Rural Development' },

  // Land / Revenue
  { id: 'mh-revenue', name: 'Maharashtra State Revenue Department', url: 'https://revenue.maharashtra.gov.in/', category: 'Maharashtra', department: 'Revenue & Land Records' },
  { id: 'mh-land-records', name: 'Maharashtra Mahabhumi Land Records', url: 'https://mahabhumi.maharashtra.gov.in/', category: 'Maharashtra', department: 'Revenue & Land Records' },
  { id: 'mh-registration', name: 'Maharashtra Stamp-Registration (IGR)', url: 'https://igrmaharashtra.gov.in/', category: 'Maharashtra', department: 'Revenue & Land Records' },
  { id: 'mh-land-dept', name: 'Maharashtra Land Revenue Department Office', url: 'https://maharashtra.gov.in/Site/Departments/Revenue', category: 'Maharashtra', department: 'Revenue & Land Records' },
  { id: 'mh-revenue-board', name: 'Maharashtra Revenue Board Administration', url: 'https://revenue.maharashtra.gov.in/', category: 'Maharashtra', department: 'Revenue & Land Records' },

  // Urban & Housing
  { id: 'mh-housing', name: 'Maharashtra Housing & Urban Planning', url: 'https://housing.maharashtra.gov.in/', category: 'Maharashtra', department: 'Housing & Urban Development' },
  { id: 'mh-mumbai-mun', name: 'Mumbai Municipal Corporation Gateway', url: 'https://www.mcgm.gov.in/irj/portal/anonymous', category: 'Maharashtra', department: 'Housing & Urban Development' },
  { id: 'mh-municipal', name: 'Maharashtra Municipal Administration Board', url: 'https://municipal.maharashtra.gov.in/', category: 'Maharashtra', department: 'Housing & Urban Development' },
  { id: 'mh-urban-dev', name: 'Maharashtra Urban Development Department', url: 'https://udd.maharashtra.gov.in/', category: 'Maharashtra', department: 'Housing & Urban Development' },
  { id: 'mh-mcgm', name: 'Brihanmumbai Municipal Corporation (BMC)', url: 'https://www.mcgm.gov.in/', category: 'Maharashtra', department: 'Housing & Urban Development' },

  // Taxes & Finance
  { id: 'mh-finance', name: 'Maharashtra State Finance Department', url: 'https://finance.maharashtra.gov.in/', category: 'Maharashtra', department: 'Administration' },
  { id: 'mh-commercial-tax', name: 'Maharashtra Commercial Tax (MahaVAT)', url: 'https://mahavat.maharashtra.gov.in/', category: 'Maharashtra', department: 'Administration' },
  { id: 'mh-excise', name: 'Maharashtra State Excise Department', url: 'https://excise.maharashtra.gov.in/', category: 'Maharashtra', department: 'Administration' },
  { id: 'mh-food-dept', name: 'Maharashtra Civil Supplies & Food Division', url: 'https://mahafood.gov.in/', category: 'Maharashtra', department: 'Administration' },

  // Welfare
  { id: 'mh-scst-welfare', name: 'Maharashtra Caste & Tribe Welfare Board', url: 'https://st.maharashtra.gov.in/', category: 'Maharashtra', department: 'Welfare Schemes' },
  { id: 'mh-bc-welfare', name: 'Maharashtra Backward Classes Development', url: 'https://bcwelfare.maharashtra.gov.in/', category: 'Maharashtra', department: 'Welfare Schemes' },
  { id: 'mh-minority-welfare', name: 'Maharashtra Minority Development Department', url: 'https://minority.maharashtra.gov.in/', category: 'Maharashtra', department: 'Welfare Schemes' },
  { id: 'mh-wcd', name: 'Maharashtra Women & Child Development', url: 'https://wcd.maharashtra.gov.in/', category: 'Maharashtra', department: 'Welfare Schemes' },
  { id: 'mh-anganwadi', name: 'Maharashtra Anganwadi Direct Recruitment', url: 'https://wcd.maharashtra.gov.in/anganwadi', category: 'Maharashtra', department: 'Welfare Schemes' },
  { id: 'mh-social-justice', name: 'Maharashtra Department of Social Justice', url: 'https://sj.maharashtra.gov.in/', category: 'Maharashtra', department: 'Welfare Schemes' },
  { id: 'mh-disability', name: 'Maharashtra Differently Abled Welfare Board', url: 'https://disability.maharashtra.gov.in/', category: 'Maharashtra', department: 'Welfare Schemes' },

  // E-Services
  { id: 'mh-aaple-sarkar', name: 'Aaple Sarkar Citizen Services', url: 'https://aaplesarkar.mahaonline.gov.in/en', category: 'Maharashtra', department: 'E-Services' },
  { id: 'mh-online-services', name: 'MahaOnline District Services Unified', url: 'https://mahaonline.gov.in/', category: 'Maharashtra', department: 'E-Services' },
  { id: 'mh-direct-services', name: 'Maharashtra Direct Services Gateway', url: 'https://maharashtra.gov.in/Site/1597/Services', category: 'Maharashtra', department: 'E-Services' },
  { id: 'mh-e-seva', name: 'Maharashtra e-Seva Citizen Center', url: 'https://mahaonline.gov.in/', category: 'Maharashtra', department: 'E-Services' },

  // Government Orders / Databases
  { id: 'mh-e-gazette', name: 'Maharashtra State e-Gazette Board', url: 'https://maharashtra.gov.in/Site/Departments/Parliamentary-And-Legislative-Affairs', category: 'Maharashtra', department: 'Government Gazettes' },
  { id: 'mh-go-portal', name: 'Maharashtra Government Orders DB', url: 'https://mahadbt.maharashtra.gov.in/', category: 'Maharashtra', department: 'Government Gazettes' },
  { id: 'mh-dbt', name: 'MahaDBT Direct Benefit Transfer Portal', url: 'https://mahadbt.maharashtra.gov.in/', category: 'Maharashtra', department: 'Welfare Schemes' },

  // Banking / Cooperatives
  { id: 'mh-cooperative', name: 'Maharashtra Cooperative Societies Registrar', url: 'https://cooperation.maharashtra.gov.in/', category: 'Maharashtra', department: 'Administrative Units' },
  { id: 'mh-coop-bank', name: 'Maharashtra State Co-operative Bank Hub', url: 'https://mcb.co.in/', category: 'Maharashtra', department: 'Administrative Units' },

  // Industries & Businesses
  { id: 'mh-industries-dept', name: 'Maharashtra Directorate of Industries', url: 'https://industries.maharashtra.gov.in/', category: 'Maharashtra', department: 'Industries & IT' },
  { id: 'mh-msme', name: 'Maharashtra MSME Development Corporation', url: 'https://msme.maharashtra.gov.in/', category: 'Maharashtra', department: 'Industries & IT' },
  { id: 'mh-startup', name: 'Maharashtra Startup & Innovation Mission', url: 'https://startupmission.maharashtra.gov.in/', category: 'Maharashtra', department: 'Industries & IT' },
  { id: 'mh-trade', name: 'Maharashtra State Trade Promotion Council', url: 'https://trade.maharashtra.gov.in/', category: 'Maharashtra', department: 'Industries & IT' },
  { id: 'mh-udhyog-promo', name: 'Maharashtra Udyog Industries Promotion Board', url: 'https://udyog.maharashtra.gov.in/', category: 'Maharashtra', department: 'Industries & IT' },

  // Careers / Tourism
  { id: 'mh-tourism', name: 'Maharashtra Tourism Development Corporation', url: 'https://maharashtratourism.gov.in/', category: 'Maharashtra', department: 'Tourism & Culture' },
  { id: 'mh-skill-dev', name: 'Maharashtra Skill Development Portal', url: 'https://maharashtraskills.maharashtra.gov.in/', category: 'Maharashtra', department: 'Employment Services' },
  { id: 'mh-maritime', name: 'Maharashtra Maritime Board (MMB)', url: 'https://maharashtramaritime.gov.in/', category: 'Maharashtra', department: 'Transport & Infrastructure' },
  { id: 'mh-maritime-ports', name: 'Maharashtra Ports & Shipping Ministry', url: 'https://maharashtra.gov.in/Site/Departments/Ports-And-Shipping', category: 'Maharashtra', department: 'Transport & Infrastructure' },
  { id: 'mh-mumbai-port', name: 'Mumbai Port Trust Careers Portal', url: 'https://myp.ipos.gov.in/', category: 'Maharashtra', department: 'Transport & Infrastructure' },
  { id: 'mh-jnpt-port', name: 'Jawaharlal Nehru Port Authority (JNPA)', url: 'https://jnport.gov.in/', category: 'Maharashtra', department: 'Transport & Infrastructure' },
  { id: 'mh-postal', name: 'Maharashtra Postal Circle Careers Desk', url: 'https://maharashtra.post.gov.in/', category: 'Maharashtra', department: 'Transport & Infrastructure' },
  { id: 'mh-railways', name: 'Maharashtra State Railways Coordination Unit', url: 'https://maharashtra.railway.gov.in/', category: 'Maharashtra', department: 'Transport & Infrastructure' },

  // --- BIHAR GOVERNMENT WEBSITES ---
  // Main & Portals
  { id: 'br-portal', name: 'Bihar State Government Portal', url: 'https://bihar.nic.in/', category: 'Bihar', department: 'Main State Portal' },
  { id: 'br-integrated', name: 'Bihar Integrated Mission Portal', url: 'https://state.bihar.gov.in/', category: 'Bihar', department: 'Main State Portal' },
  { id: 'br-cmo', name: 'Bihar Chief Minister Office (CMO)', url: 'https://cmo.bihar.gov.in/', category: 'Bihar', department: 'Administration' },
  { id: 'br-cmo-news', name: 'Bihar CM Press Releases Dispatch', url: 'https://cmo.bihar.gov.in/news', category: 'Bihar', department: 'Administration' },
  { id: 'br-latest-news', name: 'Bihar Latest News & Decisions', url: 'https://state.bihar.gov.in/news', category: 'Bihar', department: 'Administration' },
  { id: 'br-nic-patna', name: 'NIC Bihar National Centre (Patna)', url: 'https://patna.nic.in/', category: 'Bihar', department: 'E-Governance' },

  // BPSC & Rec-boards
  { id: 'br-psc', name: 'Bihar Public Service Commission (BPSC)', url: 'https://bpsc.bih.nic.in/', category: 'Bihar', department: 'Recruitment Board' },
  { id: 'br-psc-results', name: 'BPSC Exam & Recruitment Results', url: 'https://bpsc.bih.nic.in/results', category: 'Bihar', department: 'Recruitment Board' },
  { id: 'br-psc-calendar', name: 'BPSC Official Exam Calendar', url: 'https://bpsc.bih.nic.in/exam-calendar', category: 'Bihar', department: 'Recruitment Board' },
  { id: 'br-psc-app', name: 'BPSC Interactive Application System', url: 'https://bpsc.bih.nic.in/application', category: 'Bihar', department: 'Recruitment Board' },
  { id: 'br-bpssc', name: 'Bihar Police Sub-ordinate Services Commission (BPSSC)', url: 'https://bpssc.bih.nic.in/', category: 'Bihar', department: 'Police Recruitment' },
  { id: 'br-btsc', name: 'Bihar Technical Service Commission (BTSC)', url: 'https://btsc.bih.nic.in/', category: 'Bihar', department: 'Recruitment Board' },

  // Police & Law
  { id: 'br-police', name: 'Bihar State Police HQ', url: 'https://police.bihar.gov.in/', category: 'Bihar', department: 'Police & Security' },
  { id: 'br-police-rec', name: 'Bihar Police Official Recruitment Cell (CSBC)', url: 'https://csbc.bih.nic.in/', category: 'Bihar', department: 'Police & Security' },
  { id: 'br-police-constable', name: 'Bihar Police Constable Active Exams', url: 'https://csbc.bih.nic.in/', category: 'Bihar', department: 'Police & Security' },
  { id: 'br-police-si', name: 'Bihar Police Sub-Inspector Openings', url: 'https://police.bihar.gov.in/en/recruitment', category: 'Bihar', department: 'Police & Security' },
  { id: 'br-police-head-const', name: 'Bihar Police Head Constable Cell', url: 'https://police.bihar.gov.in/en/recruitment', category: 'Bihar', department: 'Police & Security' },
  { id: 'br-fire-force', name: 'Bihar Fire Force & Emergency Services', url: 'https://fire.bihar.gov.in/', category: 'Bihar', department: 'Police & Security' },
  { id: 'br-high-court', name: 'Patna High Court Judicial Careers', url: 'https://patnahighcourt.gov.in/', category: 'Bihar', department: 'Government Gazettes' },
  { id: 'br-dist-courts', name: 'Bihar Local District Courts Directory', url: 'https://districtcourts.nic.in/', category: 'Bihar', department: 'Government Gazettes' },

  // Teachers / Education
  { id: 'br-education', name: 'Bihar General Education Department', url: 'https://education.bih.nic.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-tet', name: 'Bihar Teacher Eligibility Test (TET) Board', url: 'https://bseb.bih.nic.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-teachers-list', name: 'Bihar School Teachers Allocation', url: 'https://education.bih.nic.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-pgt-tgt', name: 'Bihar PGT/TGT Recruitment Deployments', url: 'https://education.bih.nic.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-bed-admit', name: 'Bihar B.Ed Direct Admissions Portal', url: 'https://biharboard.bih.nic.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-bseb', name: 'Bihar School Examination Board (BSEB) Primary', url: 'https://bseb.bih.nic.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-higher-sec', name: 'Bihar Higher Secondary Education Council', url: 'https://bsehs.bih.nic.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-higher-edu', name: 'Bihar Higher Education Department Office', url: 'https://he.bihar.gov.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-tech-edu', name: 'Bihar Directorate of Technical Education', url: 'https://dte.bihar.gov.in/', category: 'Bihar', department: 'Education Department' },
  { id: 'br-university', name: 'Bihar State Universities Selection (dbt)', url: 'https://db罢.bih.nic.in/', category: 'Bihar', department: 'Education Department' },

  // Health
  { id: 'br-health', name: 'Bihar Public Health Department', url: 'https://health.bihar.gov.in/', category: 'Bihar', department: 'Health Department' },
  { id: 'br-medical-services', name: 'Bihar Directorate of Health Services', url: 'https://healthservices.bihar.gov.in/', category: 'Bihar', department: 'Health Department' },
  { id: 'br-nursing', name: 'Bihar Nursing and Midwives Council', url: 'https://nursing.bihar.gov.in/', category: 'Bihar', department: 'Health Department' },
  { id: 'br-ayush', name: 'Bihar State AYUSH Admissions Board', url: 'https://ayush.bihar.gov.in/', category: 'Bihar', department: 'Health Department' },
  { id: 'br-phc', name: 'Bihar Primary Health Care Centers (PHC/CHC)', url: 'https://health.bihar.gov.in/', category: 'Bihar', department: 'Health Department' },
  { id: 'br-family-welfare', name: 'Bihar Health & Family Welfare Directorate', url: 'https://fw.bihar.gov.in/', category: 'Bihar', department: 'Health Department' },

  // Agriculture & Forest
  { id: 'br-agri', name: 'Bihar Agriculture Department', url: 'https://agriculture.bihar.gov.in/', category: 'Bihar', department: 'Agriculture Department' },
  { id: 'br-horticulture', name: 'Bihar Directorate of Horticulture & Food', url: 'https://horticulture.bihar.gov.in/', category: 'Bihar', department: 'Agriculture Department' },
  { id: 'br-forest', name: 'Bihar Environment, Forest & Wildlife Office', url: 'https://forest.bihar.gov.in/', category: 'Bihar', department: 'Forest & Environment' },
  { id: 'br-animal-husbandry', name: 'Bihar Animal Husbandry Services System', url: 'https://ah.bihar.gov.in/', category: 'Bihar', department: 'Agriculture Department' },
  { id: 'br-fisheries', name: 'Bihar Fisheries Development Authority', url: 'https://fisheries.bihar.gov.in/', category: 'Bihar', department: 'Agriculture Department' },
  { id: 'br-soil-cons', name: 'Bihar Soil Conservation Directorate Office', url: 'https://soilconservation.bihar.gov.in/', category: 'Bihar', department: 'Agriculture Department' },

  // Transport
  { id: 'br-transport', name: 'Bihar Motor Vehicles & Transport Department', url: 'https://transport.bihar.gov.in/', category: 'Bihar', department: 'Transport & Infrastructure' },
  { id: 'br-srtc', name: 'Bihar State Road Transport Corporation (BSRTC)', url: 'https://bhsrtc.bih.nic.in/', category: 'Bihar', department: 'Transport & Infrastructure' },

  // Energy & Power
  { id: 'br-power', name: 'Bihar Department of Power & Energy', url: 'https://power.bihar.gov.in/', category: 'Bihar', department: 'Power Sector' },
  { id: 'br-vidyut', name: 'Bihar Vidyut Board (JBPCB Control)', url: 'https://jbpcb.bih.nic.in/', category: 'Bihar', department: 'Power Sector' },
  { id: 'br-distribution', name: 'Bihar Power Distribution Grid Corporation', url: 'https://dgp.bih.nic.in/', category: 'Bihar', department: 'Power Sector' },

  // Panchayat Raj / Rural Dev
  { id: 'br-panchayat', name: 'Bihar Panchayat Raj Department (LBPR)', url: 'https://lbpr.bihar.gov.in/', category: 'Bihar', department: 'Rural Development' },
  { id: 'br-nrega', name: 'MGNREGA Bihar Job Card Scheme', url: 'https://mgnrega.nic.in/', category: 'Bihar', department: 'Rural Development' },
  { id: 'br-rural-dev', name: 'Bihar Rural Development Commission', url: 'https://rd.bihar.gov.in/', category: 'Bihar', department: 'Rural Development' },
  { id: 'br-gramin', name: 'Bihar Gramin Unified Rural Department', url: 'https://gramin.bihar.gov.in/', category: 'Bihar', department: 'Rural Development' },

  // Land / Revenue
  { id: 'br-revenue', name: 'Bihar State Revenue & Reforms Department', url: 'https://revenue.bihar.gov.in/', category: 'Bihar', department: 'Revenue & Land Records' },
  { id: 'br-land-records', name: 'Bihar Bhulekh Land Records System', url: 'https://bhulekh.bihar.gov.in/', category: 'Bihar', department: 'Revenue & Land Records' },
  { id: 'br-registration', name: 'Bihar Stamp and Registration (IGRIP)', url: 'https://registration.bihar.gov.in/', category: 'Bihar', department: 'Revenue & Land Records' },
  { id: 'br-land-board', name: 'Bihar State Land Reforms Board', url: 'https://revenue.bihar.gov.in/', category: 'Bihar', department: 'Revenue & Land Records' },

  // Housing & Urban
  { id: 'br-housing', name: 'Bihar State Housing Board (BSB)', url: 'https://bsb.bihar.gov.in/', category: 'Bihar', department: 'Housing & Urban Development' },
  { id: 'br-bsb-housing', name: 'Bihar Urban Housing Development', url: 'https://bsb.bihar.gov.in/', category: 'Bihar', department: 'Housing & Urban Development' },
  { id: 'br-municipal', name: 'Bihar Municipal Administration Council', url: 'https://municipal.bihar.gov.in/', category: 'Bihar', department: 'Housing & Urban Development' },
  { id: 'br-urban-dev', name: 'Bihar Urban Development Department (UDD)', url: 'https://udd.bihar.gov.in/', category: 'Bihar', department: 'Housing & Urban Development' },
  { id: 'br-patna-mun', name: 'Patna Municipal Corporation (PMC)', url: 'https://pncb.bih.nic.in/', category: 'Bihar', department: 'Housing & Urban Development' },

  // Taxes & Finance
  { id: 'br-finance', name: 'Bihar State Finance Department', url: 'https://finance.bihar.gov.in/', category: 'Bihar', department: 'Administration' },
  { id: 'br-commercial-tax', name: 'Bihar Commercial Taxes Department (CTAX)', url: 'https://ctax.bihar.gov.in/', category: 'Bihar', department: 'Administration' },
  { id: 'br-excise', name: 'Bihar State Prohibition & Excise Office', url: 'https://excise.bihar.gov.in/', category: 'Bihar', department: 'Administration' },
  { id: 'br-food-dept', name: 'Bihar Civil Supplies & Food Division', url: 'https://food.bihar.gov.in/', category: 'Bihar', department: 'Administration' },

  // Welfare Schemes
  { id: 'br-scst-welfare', name: 'Bihar Caste & Tribe Welfare Board', url: 'https://stwelfare.bihar.gov.in/', category: 'Bihar', department: 'Welfare Schemes' },
  { id: 'br-bc-welfare', name: 'Bihar Backward Classes Development', url: 'https://bcwelfare.bihar.gov.in/', category: 'Bihar', department: 'Welfare Schemes' },
  { id: 'br-minority-welfare', name: 'Bihar Minority Development Department', url: 'https://minority.bihar.gov.in/', category: 'Bihar', department: 'Welfare Schemes' },
  { id: 'br-wcd', name: 'Bihar Women & Child Development Directorate', url: 'https://wcd.bihar.gov.in/', category: 'Bihar', department: 'Welfare Schemes' },
  { id: 'br-anganwadi', name: 'Bihar Anganwadi Direct Recruit Portal', url: 'https://wcd.bihar.gov.in/anganwadi', category: 'Bihar', department: 'Welfare Schemes' },
  { id: 'br-social-welfare', name: 'Bihar Social Welfare Department', url: 'https://socialwelfare.bihar.gov.in/', category: 'Bihar', department: 'Welfare Schemes' },
  { id: 'br-disability', name: 'Bihar Welfare of Differently Abled Persons', url: 'https://disability.bihar.gov.in/', category: 'Bihar', department: 'Welfare Schemes' },

  // E-Services
  { id: 'br-edistrict', name: 'Bihar e-District Administration Portal', url: 'https://edistrict.bihar.gov.in/', category: 'Bihar', department: 'E-Services' },
  { id: 'br-e-seva', name: 'Bihar e-Seva Unified Citizen Services', url: 'https://sewa.bihar.gov.in/', category: 'Bihar', department: 'E-Services' },
  { id: 'br-online-services', name: 'Bihar Online Services Main Portal', url: 'https://state.bihar.gov.in/services', category: 'Bihar', department: 'E-Services' },
  { id: 'br-citizen-services', name: 'Bihar Unified Citizen Services Gateway', url: 'https://citizen.bihar.gov.in/', category: 'Bihar', department: 'E-Services' },

  // Government Orders
  { id: 'br-egazette', name: 'Bihar State e-Gazette Board', url: 'https://egazette.bihar.gov.in/', category: 'Bihar', department: 'Government Gazettes' },
  { id: 'br-go-portal', name: 'Bihar Government Orders Database Portal', url: 'https://state.bihar.gov.in/government-orders', category: 'Bihar', department: 'Government Gazettes' },

  // Banking / Cooperative
  { id: 'br-cooperative', name: 'Bihar Cooperative Societies Registrar', url: 'https://cooperation.bihar.gov.in/', category: 'Bihar', department: 'Administrative Units' },
  { id: 'br-coop-bank', name: 'Bihar State Co-operative Bank Hub', url: 'https://biharcoopbank.com/', category: 'Bihar', department: 'Administrative Units' },

  // Industries & Businesses
  { id: 'br-industries-dept', name: 'Bihar Directorate of Industries', url: 'https://industries.bihar.gov.in/', category: 'Bihar', department: 'Industries & IT' },
  { id: 'br-msme', name: 'Bihar MSME Development Commission', url: 'https://msme.bihar.gov.in/', category: 'Bihar', department: 'Industries & IT' },
  { id: 'br-trade', name: 'Bihar State Trade Promotion Council Office', url: 'https://trade.bihar.gov.in/', category: 'Bihar', department: 'Industries & IT' },
  { id: 'br-udhyog-promo', name: 'Bihar Udyog Industries Portal', url: 'https://udyog.bihar.gov.in/', category: 'Bihar', department: 'Industries & IT' },

  // Tourism & Post / Railways
  { id: 'br-tourism', name: 'Bihar Tourism Development Corporation', url: 'https://tourism.bihar.gov.in/', category: 'Bihar', department: 'Tourism & Culture' },
  { id: 'br-skill-dev', name: 'Bihar Skill Development Mission (BSDM)', url: 'https://skil.bihar.gov.in/', category: 'Bihar', department: 'Employment Services' },
  { id: 'br-maritime', name: 'Bihar Maritime Transport Commission', url: 'https://maritime.bihar.gov.in/', category: 'Bihar', department: 'Transport & Infrastructure' },
  { id: 'br-postal', name: 'Bihar Postal Circle Careers Desk', url: 'https://bihar.post.gov.in/', category: 'Bihar', department: 'Transport & Infrastructure' },
  { id: 'br-railways', name: 'Bihar State Railways Coordination Unit', url: 'https://railways.bihar.gov.in/', category: 'Bihar', department: 'Transport & Infrastructure' },
  { id: 'br-coordination', name: 'Bihar State Department Coordination Gate', url: 'https://bihar.nic.in/', category: 'Bihar', department: 'Administrative Units' },
  { id: 'br-ibhugoal', name: 'Bihar iBHUGOAL Lands GIS System', url: 'https://ibhgoal.bihar.gov.in/', category: 'Bihar', department: 'Revenue & Land Records' },

  // --- WEST BENGAL GOVERNMENT WEBSITES ---
  // Main & Portals
  { id: 'wb-portal', name: 'West Bengal State Government Portal', url: 'https://wb.gov.in/', category: 'West Bengal', department: 'Main State Portal' },
  { id: 'wb-portal-alt', name: 'Egiye Bangla Portal (Main State)', url: 'https://www.wb.gov.in/', category: 'West Bengal', department: 'Main State Portal' },
  { id: 'wb-cmo', name: 'West Bengal Chief Minister Office (CMO)', url: 'https://cmo.wb.gov.in/', category: 'West Bengal', department: 'Administration' },
  { id: 'wb-cmo-releases', name: 'West Bengal CM Press Releases Desk', url: 'https://cmo.wb.gov.in/pressreleases', category: 'West Bengal', department: 'Administration' },
  { id: 'wb-latest-news', name: 'West Bengal Government Latest News', url: 'https://www.wb.gov.in/news', category: 'West Bengal', department: 'Administration' },

  // WBPSC
  { id: 'wb-psc', name: 'West Bengal Public Service Commission (WBPSC)', url: 'https://wbpsc.gov.in/', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-psc-results', name: 'WBPSC Exam Results & Declarations', url: 'https://wbpsc.gov.in/results', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-psc-calendar', name: 'WBPSC Recruitment Exam Calendar', url: 'https://wbpsc.gov.in/exam-calendar', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-psc-app', name: 'WBPSC Interactive Applications', url: 'https://wbpsc.gov.in/application', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-psc-comb', name: 'WBPSC Combined Competitive Exam Cell', url: 'https://wbpsc.gov.in/combined-competitive', category: 'West Bengal', department: 'Recruitment Board' },

  // WBSSC & Subordinate Services
  { id: 'wb-ssc', name: 'West Bengal Staff Selection Commission (WBSSC)', url: 'https://wbssc.gov.in/', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-ssc-results', name: 'WBSSC Competitive Exam Results', url: 'https://wbssc.gov.in/results', category: 'West Bengal', department: 'Recruitment Board' },
  { id: 'wb-ssc-app', name: 'WBSSC Application Intake System', url: 'https://wbssc.gov.in/application', category: 'West Bengal', department: 'Recruitment Board' },

  // Police & Fire
  { id: 'wb-police-main', name: 'West Bengal Police General Headquarter', url: 'https://police.wb.gov.in/', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-police', name: 'West Bengal Police Recruitment Board (WBPRB)', url: 'https://police.wb.gov.in/en/recruitment', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-police-constable', name: 'WB Police Constable Careers Division', url: 'https://police.wb.gov.in/en/recruitment', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-police-si', name: 'WB Police SI Competitive Openings', url: 'https://police.wb.gov.in/en/recruitment', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-police-head-const', name: 'WB Police Head Constable Intake', url: 'https://police.wb.gov.in/en/recruitment', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-police-sub-insp', name: 'WB Police Sub-Inspector Cells', url: 'https://police.wb.gov.in/en/recruitment', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-fire-services', name: 'West Bengal Fire Emergency Services (WBFES)', url: 'https://wbfes.gov.in/wbfes/', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-police-correctional', name: 'WB Correctional Services Department', url: 'https://wbcorrectionalservices.gov.in/', category: 'West Bengal', department: 'Police & Security' },

  // Teachers / Education
  { id: 'wb-education', name: 'West Bengal School Education Department', url: 'https://banglarshiksha.wb.gov.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-teachers', name: 'West Bengal Teacher Eligibility Test (TET)', url: 'https://wbtedgwb.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-set', name: 'West Bengal SET Accreditation Cell', url: 'https://wbtedgwb.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-trb', name: 'West Bengal Teacher Recruitment Board (TRB)', url: 'https://wbtedgwb.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-pgt-tgt', name: 'WB PGT/TGT Recruitment Deployments', url: 'https://wbtedgwb.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-school-service', name: 'West Bengal School Service Commission', url: 'https://wbschoolservice.gov.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-bed', name: 'West Bengal B.Ed Professional Program Board', url: 'https://wbtedgwb.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-higher-edu', name: 'West Bengal Higher Education Department Office', url: 'https://banglaruchchashiksha.wb.gov.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-higher-sec-edu', name: 'West Bengal Higher Secondary Education Council', url: 'https://wbchse.wb.gov.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-council-higher-sec', name: 'WB Council of Higher Secondary Administration', url: 'https://wbchse.wb.gov.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-tech-edu', name: 'West Bengal Council of Technical Vocational Training', url: 'https://www.wbscvet.nic.in/', category: 'West Bengal', department: 'Education Department' },
  { id: 'wb-mass-education', name: 'West Bengal Mass Education Extension Office', url: 'https://meels.wb.gov.in/', category: 'West Bengal', department: 'Education Department' },

  // Health & Family Welfare
  { id: 'wb-health', name: 'West Bengal Health & Family Welfare (WBHEALTH)', url: 'https://www.wbhealth.gov.in/', category: 'West Bengal', department: 'Health Department' },
  { id: 'wb-health-medical', name: 'West Bengal Directorate of Health Services', url: 'https://healthservices.wb.gov.in/', category: 'West Bengal', department: 'Health Department' },
  { id: 'wb-health-nursing', name: 'West Bengal Nursing Council Registry', url: 'https://nursing.wb.gov.in/', category: 'West Bengal', department: 'Health Department' },
  { id: 'wb-health-ayush', name: 'West Bengal AYUSH Medical Council', url: 'https://ayush.wb.gov.in/', category: 'West Bengal', department: 'Health Department' },
  { id: 'wb-health-phc', name: 'West Bengal Primary & Community Health Centers', url: 'https://www.wbhealth.gov.in/', category: 'West Bengal', department: 'Health Department' },
  { id: 'wb-health-family-welfare', name: 'WB Family Welfare Services Division', url: 'https://fw.wb.gov.in/', category: 'West Bengal', department: 'Health Department' },
  { id: 'wb-health-med-edu', name: 'West Bengal Medical Education Services Office', url: 'https://mededu.wb.gov.in/', category: 'West Bengal', department: 'Health Department' },

  // Agriculture, Hills & Forests
  { id: 'wb-agri', name: 'West Bengal Agriculture Division (Matir Katha)', url: 'https://matirkatha.net/', category: 'West Bengal', department: 'Agriculture Department' },
  { id: 'wb-agri-marketing', name: 'West Bengal State Agricultural Marketing Board', url: 'https://agrimarketing.wb.gov.in/', category: 'West Bengal', department: 'Agriculture Department' },
  { id: 'wb-horticulture', name: 'West Bengal Horticulture Food Processing Board', url: 'https://www.wbfpih.gov.in/', category: 'West Bengal', department: 'Agriculture Department' },
  { id: 'wb-forest', name: 'West Bengal Forest Department Agency', url: 'https://www.westbengalforest.gov.in/', category: 'West Bengal', department: 'Forest & Environment' },
  { id: 'wb-animal-resources', name: 'West Bengal Animal Resources Development Office', url: 'https://www.wbard.gov.in/', category: 'West Bengal', department: 'Agriculture Department' },
  { id: 'wb-fisheries', name: 'West Bengal State Fisheries Development Unit', url: 'https://www.wbfisheries.in/', category: 'West Bengal', department: 'Agriculture Department' },

  // Transport
  { id: 'wb-transport', name: 'West Bengal State Transport Department Office', url: 'https://transport.wb.gov.in/', category: 'West Bengal', department: 'Transport & Infrastructure' },

  // Power & Water Engineering
  { id: 'wb-power', name: 'West Bengal Department of Power Office', url: 'https://power.wb.gov.in/', category: 'West Bengal', department: 'Power Sector' },
  { id: 'wb-phed', name: 'West Bengal Public Health Engineering (WBPHED)', url: 'https://wbphed.gov.in/en/home', category: 'West Bengal', department: 'Transport & Infrastructure' },
  { id: 'wb-pwd', name: 'West Bengal Public Works Department (WBPWD)', url: 'https://wbpwd.gov.in/', category: 'West Bengal', department: 'Transport & Infrastructure' },

  // Panchayat Raj & Rural
  { id: 'wb-panchayat', name: 'West Bengal Panchayat Rural Development (WBPRD)', url: 'https://www.wbprd.gov.in/', category: 'West Bengal', department: 'Rural Development' },
  { id: 'wb-panchayat-rec', name: 'West Bengal Panchayat Recruitment PRMS', url: 'https://wbprms.in/', category: 'West Bengal', department: 'Rural Development' },
  { id: 'wb-rural-dev', name: 'West Bengal Rural Development Council Office', url: 'https://rd.wb.gov.in/', category: 'West Bengal', department: 'Rural Development' },

  // Revenue & Land
  { id: 'wb-land', name: 'West Bengal Banglarbhumi Land Records', url: 'https://banglarbhumi.gov.in/', category: 'West Bengal', department: 'Revenue & Land Records' },
  { id: 'wb-land-records', name: 'West Bengal Land Revenue System Portal', url: 'https://banglarbhumi.gov.in/', category: 'West Bengal', department: 'Revenue & Land Records' },
  { id: 'wb-revenue', name: 'West Bengal Revenue Department Head Office', url: 'https://official.wb.gov.in/departments/revenue', category: 'West Bengal', department: 'Revenue & Land Records' },

  // Housing & Urban
  { id: 'wb-housing', name: 'West Bengal State Housing Board (WBH)', url: 'https://www.wbhousing.gov.in/', category: 'West Bengal', department: 'Housing & Urban Development' },
  { id: 'wb-urban-services', name: 'West Bengal Urban Services Development Commission', url: 'https://www.wburbanservices.gov.in/', category: 'West Bengal', department: 'Housing & Urban Development' },
  { id: 'wb-municipal', name: 'West Bengal Municipal Affairs Department Portal', url: 'https://municipal.wb.gov.in/', category: 'West Bengal', department: 'Housing & Urban Development' },

  // Finance & Markets
  { id: 'wb-finance', name: 'West Bengal State Finance Department Office', url: 'https://finance.wb.gov.in/', category: 'West Bengal', department: 'Administration' },
  { id: 'wb-consumer-affairs', name: 'West Bengal Consumer Affairs Department Bureau', url: 'https://wbconsumers.gov.in/', category: 'West Bengal', department: 'Administration' },

  // Welfare & Tribal Schemes
  { id: 'wb-scst-welfare', name: 'West Bengal SC/ST Development Board', url: 'https://stwelfare.wb.gov.in/', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-bc-welfare', name: 'West Bengal Backward Classes Welfare Directorate', url: 'http://www.anagrasarkalyan.gov.in/', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-minority-affairs', name: 'West Bengal Minority Affairs Development Office', url: 'https://wbminorityaffairs.gov.in/', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-women-child', name: 'West Bengal Women & Child Development (WCDWD)', url: 'http://wbcdwdsw.gov.in/User/wcdw_stat', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-social-welfare', name: 'West Bengal Social Welfare Directorate Panel', url: 'http://wbcdwdsw.gov.in/User/wcdw_stat', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-disability', name: 'West Bengal Differently Abled Welfare Commission', url: 'https://disability.wb.gov.in/', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-tribal-dev', name: 'West Bengal Adibasi Tribal Development Council', url: 'https://adibasikalyan.gov.in/', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-backward-classes', name: 'West Bengal Backward Classes Kalyan Unit', url: 'http://www.anagrasarkalyan.gov.in/', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-msme-textile', name: 'West Bengal MSME Development and Textiles Group', url: 'https://www.wbmsmet.gov.in/', category: 'West Bengal', department: 'Industries & IT' },

  // Labour & Business Development
  { id: 'wb-labour', name: 'West Bengal Labour Commissioner Office', url: 'https://www.wblabour.gov.in/', category: 'West Bengal', department: 'Administration' },
  { id: 'wb-industries', name: 'West Bengal Silpa Sathi Industries Gateway', url: 'https://silpasathi.in/', category: 'West Bengal', department: 'Industries & IT' },
  { id: 'wb-msme', name: 'West Bengal MSME Direct Business Panel Office', url: 'https://www.wbmsmet.gov.in/', category: 'West Bengal', department: 'Industries & IT' },
  { id: 'wb-shg', name: 'West Bengal Self Help Group & Coops Registry', url: 'https://www.shgsewb.gov.in/', category: 'West Bengal', department: 'Welfare Schemes' },
  { id: 'wb-startup', name: 'West Bengal Startup India Incubation Center', url: 'https://startupindia.wb.gov.in/', category: 'West Bengal', department: 'Employment Services' },

  // Law & High Court
  { id: 'wb-high-court', name: 'Calcutta High Court Judicial Recruitment', url: 'https://calcuttahighcourt.gov.in/', category: 'West Bengal', department: 'Government Gazettes' },
  { id: 'wb-dist-courts', name: 'West Bengal Local District Courts Directory', url: 'https://districtcourts.nic.in/', category: 'West Bengal', department: 'Government Gazettes' },

  // E-Services
  { id: 'wb-edistrict', name: 'West Bengal e-District Citizen Services Office', url: 'https://edistrict.wb.gov.in/', category: 'West Bengal', department: 'E-Services' },
  { id: 'wb-services', name: 'West Bengal Government Online Services Hub', url: 'https://www.wb.gov.in/services', category: 'West Bengal', department: 'E-Services' },
  { id: 'wb-districts-portal', name: 'West Bengal Direct Districts Hub List', url: 'https://districts.wb.gov.in/', category: 'West Bengal', department: 'E-Services' },
  { id: 'wb-rojgar-sewa', name: 'West Bengal Employment Rojgar Sewa Board', url: 'https://tetsd.wb.gov.in/rojgar_sewa/', category: 'West Bengal', department: 'Employment Services' },

  // Gazettes & Orders
  { id: 'wb-egazette', name: 'West Bengal Official State e-Gazette Board', url: 'https://egazette.wb.gov.in/', category: 'West Bengal', department: 'Government Gazettes' },
  { id: 'wb-go-portal', name: 'West Bengal Government-Orders Database Portal', url: 'https://www.wb.gov.in/government-orders', category: 'West Bengal', department: 'Government Gazettes' },

  // Tourism & Environment
  { id: 'wb-tourism', name: 'West Bengal Tourism Development Corporation', url: 'https://wbtourism.gov.in/', category: 'West Bengal', department: 'Tourism & Culture' },
  { id: 'wb-skill-dev', name: 'West Bengal Skill Development (Paschim Banga)', url: 'https://www.wbscvet.nic.in/', category: 'West Bengal', department: 'Employment Services' },
  { id: 'wb-youth-services', name: 'West Bengal Department of Sports & Youth', url: 'https://wbsportsandyouth.gov.in/', category: 'West Bengal', department: 'Tourism & Culture' },
  { id: 'wb-sports', name: 'West Bengal Sports Authority and Stadium Cell', url: 'https://wbsportsandyouth.gov.in/', category: 'West Bengal', department: 'Tourism & Culture' },
  { id: 'wb-environment', name: 'West Bengal State Environment Agency', url: 'https://www.environmentwb.gov.in/', category: 'West Bengal', department: 'Forest & Environment' },
  { id: 'wb-disaster-mgmt', name: 'West Bengal Disaster Management Department', url: 'https://wbdmd.gov.in/', category: 'West Bengal', department: 'Police & Security' },
  { id: 'wb-irrigation', name: 'West Bengal Irrigation and Waterways Office', url: 'https://www.wbiwd.gov.in/', category: 'West Bengal', department: 'Transport & Infrastructure' },
  { id: 'wb-water-res', name: 'West Bengal Water Resources Development Council', url: 'https://wbwridd.gov.in/', category: 'West Bengal', department: 'Transport & Infrastructure' },
  { id: 'wb-food-process', name: 'West Bengal Food Processing Industries Group', url: 'https://www.wbfpih.gov.in/', category: 'West Bengal', department: 'Agriculture Department' },
  { id: 'wb-food-supplies', name: 'West Bengal Food & Civil Supplies Department', url: 'https://food.wb.gov.in/', category: 'West Bengal', department: 'Administration' },
  { id: 'wb-cooperation', name: 'West Bengal Cooperation Societies Registrar Unit', url: 'https://coopwb.in/', category: 'West Bengal', department: 'Administrative Units' },
  { id: 'wb-north-bengal', name: 'West Bengal North Bengal Development Authority', url: 'https://wbnorthbengaldev.gov.in/', category: 'West Bengal', department: 'Administrative Units' },
  { id: 'wb-sundarban', name: 'West Bengal Sundarban Affairs Agency Board', url: 'https://www.sundarbanaffairswb.in/', category: 'West Bengal', department: 'Administrative Units' },
  { id: 'wb-it-electronics', name: 'West Bengal Information Technology Department', url: 'https://itewb.gov.in/', category: 'West Bengal', department: 'Industries & IT' },
  { id: 'wb-science-tech', name: 'West Bengal Science & Technology Office', url: 'https://www.vigyansathi.in/', category: 'West Bengal', department: 'Industries & IT' },
  { id: 'wb-parl-affairs', name: 'West Bengal Parliamentary Affairs Administration', url: 'https://wbpad.gov.in/', category: 'West Bengal', department: 'Administration' },
  { id: 'wb-personnel', name: 'West Bengal Personnel Civil Services Commission', url: 'https://par.wb.gov.in/', category: 'West Bengal', department: 'Administration' },
  { id: 'wb-planning', name: 'West Bengal State Planning Commission Unit', url: 'https://www.wbpspm.gov.in/', category: 'West Bengal', department: 'Administration' },

  // --- MADHYA PRADESH GOVERNMENT WEBSITES ---
  // Main State Portals & Info
  { id: 'mp-portal', name: 'Madhya Pradesh State Government Portal', url: 'https://mp.gov.in/', category: 'Madhya Pradesh', department: 'Main State Portal' },
  { id: 'mp-portal-nic', name: 'NIC Madhya Pradesh State Portal Center', url: 'https://mp.nic.in/', category: 'Madhya Pradesh', department: 'Main State Portal' },
  { id: 'mp-cmo', name: 'Madhya Pradesh Chief Minister Office (CMO)', url: 'https://cmo.mp.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-cmo-releases', name: 'Madhya Pradesh CM Press Releases Desk', url: 'https://cmo.mp.gov.in/pressreleases', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-latest-news', name: 'Madhya Pradesh State Latest News Corner', url: 'https://mp.gov.in/news', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-mygov', name: 'MyGov Madhya Pradesh Citizen Engagement', url: 'https://mp.mygov.in/', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-info', name: 'Madhya Pradesh Directorate of Public Relations (MP Info)', url: 'https://www.mpinfo.org/', category: 'Madhya Pradesh', department: 'Administration' },

  // MPPSC & Services
  { id: 'mp-psc', name: 'Madhya Pradesh Public Service Commission (MPPSC)', url: 'https://mppsc.mp.gov.in/', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-psc-results', name: 'MPPSC Exam & Selection Results Center', url: 'https://mppsc.mp.gov.in/results', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-psc-calendar', name: 'MPPSC Main Competitive Exam Calendar', url: 'https://mppsc.mp.gov.in/exam-calendar', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-psc-app', name: 'MPPSC Interactive Online Applications', url: 'https://mppsc.mp.gov.in/application', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-psc-forest', name: 'MPPSC State Forest Services Recruitment', url: 'https://mppsc.mp.gov.in/forest-service', category: 'Madhya Pradesh', department: 'Recruitment Board' },

  // Vyapam / PEB
  { id: 'mp-peb', name: 'Madhya Pradesh Professional Board (MPPEB / Vyapam)', url: 'https://peb.mp.gov.in/', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-peb-results', name: 'MPPEB Competitive Exam Results', url: 'https://peb.mp.gov.in/results', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-peb-app', name: 'MPPEB Direct Online Application Intake', url: 'https://peb.mp.gov.in/application', category: 'Madhya Pradesh', department: 'Recruitment Board' },
  { id: 'mp-peb-calendar', name: 'MPPEB Recruitment Test Calendar', url: 'https://peb.mp.gov.in/exam-calendar', category: 'Madhya Pradesh', department: 'Recruitment Board' },

  // Police & Fire
  { id: 'mp-police-cowab', name: 'Madhya Pradesh State Police Portal (Cowab)', url: 'https://mpcowab.mp.gov.in/', category: 'Madhya Pradesh', department: 'Police & Security' },
  { id: 'mp-police', name: 'Madhya Pradesh Police Main Recruitment Cell', url: 'https://police.mp.gov.in/en/recruitment', category: 'Madhya Pradesh', department: 'Police & Security' },
  { id: 'mp-police-constable', name: 'MP Police Constable Intake & Exams', url: 'https://police.mp.gov.in/en/recruitment', category: 'Madhya Pradesh', department: 'Police & Security' },
  { id: 'mp-police-si', name: 'MP Police SI Competitive Advertisements', url: 'https://police.mp.gov.in/en/recruitment', category: 'Madhya Pradesh', department: 'Police & Security' },
  { id: 'mp-police-head-const', name: 'MP Police Head Constable Openings', url: 'https://police.mp.gov.in/en/recruitment', category: 'Madhya Pradesh', department: 'Police & Security' },
  { id: 'mp-fire', name: 'Madhya Pradesh Fire Force and Emergency Services', url: 'https://fire.mp.gov.in/', category: 'Madhya Pradesh', department: 'Police & Security' },

  // Teachers / Education Recruitment
  { id: 'mp-education', name: 'Madhya Pradesh Education Portal Office', url: 'https://education.mp.gov.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-tet', name: 'Madhya Pradesh Teacher Eligibility Test (TET)', url: 'https://mpedudisha.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-trb', name: 'Madhya Pradesh Teacher Recruitment Board (MPTRB)', url: 'https://mpedudisha.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-pgt-tgt', name: 'MP PGT/TGT Higher Secondary Deployments', url: 'https://mpedudisha.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-school-teachers', name: 'MP School Teachers District Allocation Desk', url: 'https://mpedudisha.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-bed', name: 'Madhya Pradesh Professional B.Ed Admissions', url: 'https://mpedudisha.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-samagra', name: 'Madhya Pradesh Samagra Social Security & ID', url: 'https://samagra.gov.in/', category: 'Madhya Pradesh', department: 'Education Department' },

  // Health
  { id: 'mp-health', name: 'Madhya Pradesh Public Health & Family Welfare', url: 'https://health.mp.gov.in/', category: 'Madhya Pradesh', department: 'Health Department' },
  { id: 'mp-health-medical', name: 'Madhya Pradesh Directorate of Health Services', url: 'https://healthservices.mp.gov.in/', category: 'Madhya Pradesh', department: 'Health Department' },
  { id: 'mp-health-nursing', name: 'Madhya Pradesh Nursing and Midwives Registry', url: 'https://nursing.mp.gov.in/', category: 'Madhya Pradesh', department: 'Health Department' },
  { id: 'mp-health-ayush', name: 'Madhya Pradesh State AYUSH Department Board', url: 'https://ayush.mp.gov.in/', category: 'Madhya Pradesh', department: 'Health Department' },
  { id: 'mp-health-phc', name: 'Madhya Pradesh PHC / CHC Portal Directory', url: 'https://health.mp.gov.in/', category: 'Madhya Pradesh', department: 'Health Department' },
  { id: 'mp-health-fw', name: 'Madhya Pradesh Family Welfare Services Division', url: 'https://fw.mp.gov.in/', category: 'Madhya Pradesh', department: 'Health Department' },
  { id: 'mp-health-med-edu', name: 'Madhya Pradesh Department of Medical Education', url: 'https://medicaleducation.mp.gov.in/', category: 'Madhya Pradesh', department: 'Health Department' },

  // Agriculture & Forest
  { id: 'mp-agri', name: 'Madhya Pradesh Farmers Welfare & Agriculture Progress', url: 'https://agriculture.mp.gov.in/', category: 'Madhya Pradesh', department: 'Agriculture Department' },
  { id: 'mp-horticulture', name: 'Madhya Pradesh Department of Horticulture', url: 'https://horticulture.mp.gov.in/', category: 'Madhya Pradesh', department: 'Agriculture Department' },
  { id: 'mp-forest', name: 'Madhya Pradesh Forest Department Admin Office', url: 'https://forest.mp.gov.in/', category: 'Madhya Pradesh', department: 'Forest & Environment' },
  { id: 'mp-animal-husbandry', name: 'Madhya Pradesh Animal Husbandry Services Unit', url: 'https://ah.mp.gov.in/', category: 'Madhya Pradesh', department: 'Agriculture Department' },
  { id: 'mp-fisheries', name: 'Madhya Pradesh Fisheries Development Authority', url: 'https://fisheries.mp.gov.in/', category: 'Madhya Pradesh', department: 'Agriculture Department' },
  { id: 'mp-soil-conservation', name: 'Madhya Pradesh Soil & Water Conservation Office', url: 'https://soilconservation.mp.gov.in/', category: 'Madhya Pradesh', department: 'Agriculture Department' },
  { id: 'mp-marketing', name: 'Madhya Pradesh AgMarkNet Mandi Board System', url: 'https://agmarknet.mp.gov.in/', category: 'Madhya Pradesh', department: 'Agriculture Department' },

  // Transport
  { id: 'mp-transport', name: 'Madhya Pradesh Department of Transport Office', url: 'https://transport.mp.gov.in/', category: 'Madhya Pradesh', department: 'Transport & Infrastructure' },
  { id: 'mp-srtc', name: 'Madhya Pradesh State Road Transport (MPSRTC)', url: 'https://mpsrtc.com/', category: 'Madhya Pradesh', department: 'Transport & Infrastructure' },

  // Energy / Power
  { id: 'mp-power', name: 'Madhya Pradesh Department of Power Office', url: 'https://power.mp.gov.in/', category: 'Madhya Pradesh', department: 'Power Sector' },
  { id: 'mp-vun', name: 'Madhya Pradesh Urja Vikas Nigam (MPVUN) Board', url: 'https://mpvun.com/', category: 'Madhya Pradesh', department: 'Power Sector' },
  { id: 'mp-dcl', name: 'Madhya Pradesh Power Distribution Corporation', url: 'https://mpdcl.co.in/', category: 'Madhya Pradesh', department: 'Power Sector' },
  { id: 'mp-transco', name: 'Madhya Pradesh Power Transmission (MPTRANSCO)', url: 'https://mptransco.co.in/', category: 'Madhya Pradesh', department: 'Power Sector' },

  // Panchayat / Rural Dev
  { id: 'mp-panchayat', name: 'Madhya Pradesh Panchayat Raj Department Office', url: 'https://panchayat.mp.gov.in/', category: 'Madhya Pradesh', department: 'Rural Development' },
  { id: 'mp-nrega', name: 'MGNREGA Madhya Pradesh Job Card Division', url: 'https://nrega.mp.gov.in/', category: 'Madhya Pradesh', department: 'Rural Development' },
  { id: 'mp-rural-dev', name: 'Madhya Pradesh Rural Development Commission', url: 'https://rd.mp.gov.in/', category: 'Madhya Pradesh', department: 'Rural Development' },
  { id: 'mp-gramin', name: 'Madhya Pradesh Gramin Unified Development System', url: 'https://gramin.mp.gov.in/', category: 'Madhya Pradesh', department: 'Rural Development' },

  // Revenue & Land Records
  { id: 'mp-revenue', name: 'Madhya Pradesh State Revenue and Reforms Office', url: 'https://revenue.mp.gov.in/', category: 'Madhya Pradesh', department: 'Revenue & Land Records' },
  { id: 'mp-land-records', name: 'Madhya Pradesh Bhulekh Unified Lands System', url: 'https://bhulekh.mp.gov.in/', category: 'Madhya Pradesh', department: 'Revenue & Land Records' },
  { id: 'mp-registration', name: 'Madhya Pradesh Stamp & Registration IGRIP', url: 'https://registration.mp.gov.in/', category: 'Madhya Pradesh', department: 'Revenue & Land Records' },
  { id: 'mp-saara', name: 'Madhya Pradesh Crop Crop Survey Smart App SAARA', url: 'https://saara.mp.gov.in/', category: 'Madhya Pradesh', department: 'Revenue & Land Records' },
  { id: 'mp-bhumi-abhilekh', name: 'Madhya Pradesh State Land Records Directorate', url: 'https://landrecords.mp.gov.in/', category: 'Madhya Pradesh', department: 'Revenue & Land Records' },

  // Housing & Urban Development
  { id: 'mp-housing', name: 'Madhya Pradesh State Housing Board (MPHB)', url: 'https://mphousing.mp.gov.in/', category: 'Madhya Pradesh', department: 'Housing & Urban Development' },
  { id: 'mp-municipal', name: 'Madhya Pradesh Municipal Services Directorate', url: 'https://municipal.mp.gov.in/', category: 'Madhya Pradesh', department: 'Housing & Urban Development' },
  { id: 'mp-urban-dev', name: 'Madhya Pradesh Urban Admin & Development (UDD)', url: 'https://udd.mp.gov.in/', category: 'Madhya Pradesh', department: 'Housing & Urban Development' },

  // Finance & Taxes
  { id: 'mp-finance', name: 'Madhya Pradesh State Finance Department Office', url: 'https://finance.mp.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-commercial-tax', name: 'Madhya Pradesh Commercial Taxes (MPVAT Window)', url: 'https://mpvat.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-excise', name: 'Madhya Pradesh Excise & Prohibition Department', url: 'https://excise.mp.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-food', name: 'Madhya Pradesh State Food & Supplies Department', url: 'https://mpfood.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },

  // Welfare Schemes
  { id: 'mp-scst-welfare', name: 'Madhya Pradesh Schedule Tribe & Caste Welfare', url: 'https://stwelfare.mp.gov.in/', category: 'Madhya Pradesh', department: 'Welfare Schemes' },
  { id: 'mp-bc-welfare', name: 'Madhya Pradesh Backward Classes Kalyan Board', url: 'https://bcwelfare.mp.gov.in/', category: 'Madhya Pradesh', department: 'Welfare Schemes' },
  { id: 'mp-minority-welfare', name: 'Madhya Pradesh Minority Development Department', url: 'https://minority.mp.gov.in/', category: 'Madhya Pradesh', department: 'Welfare Schemes' },
  { id: 'mp-wcd', name: 'Madhya Pradesh Women & Child Development (MPWCD)', url: 'https://wcd.mp.gov.in/', category: 'Madhya Pradesh', department: 'Welfare Schemes' },
  { id: 'mp-anganwadi', name: 'Madhya Pradesh Anganwadi Worker Careers Portal', url: 'https://wcd.mp.gov.in/anganwadi', category: 'Madhya Pradesh', department: 'Welfare Schemes' },
  { id: 'mp-social-justice', name: 'Madhya Pradesh Social Justice & Disabled Welfare', url: 'https://socialjustice.mp.gov.in/', category: 'Madhya Pradesh', department: 'Welfare Schemes' },
  { id: 'mp-disability', name: 'Madhya Pradesh Differently Abled Persons Welfare', url: 'https://disability.mp.gov.in/', category: 'Madhya Pradesh', department: 'Welfare Schemes' },

  // Education Org
  { id: 'mp-higher-education', name: 'Madhya Pradesh Department of Higher Education', url: 'https://he.mp.gov.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-technical-education', name: 'Madhya Pradesh Directorate of Technical Education', url: 'https://dte.mp.gov.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-board', name: 'Madhya Pradesh Board of Secondary Education (MPBSE)', url: 'https://mpbse.nic.in/', category: 'Madhya Pradesh', department: 'Education Department' },
  { id: 'mp-university-link', name: 'Madhya Pradesh State Universities (Amravati)', url: 'https://amravatiuniversity.ac.in/', category: 'Madhya Pradesh', department: 'Education Department' },

  // Judicial
  { id: 'mp-high-court', name: 'Madhya Pradesh High Court Judicial Career Cell', url: 'https://mphighcourt.nic.in/', category: 'Madhya Pradesh', department: 'Government Gazettes' },
  { id: 'mp-district-courts', name: 'Madhya Pradesh Local District Courts Directory', url: 'https://districtcourts.nic.in/', category: 'Madhya Pradesh', department: 'Government Gazettes' },

  // E-Services
  { id: 'mp-online', name: 'MP Online Citizen Portal Services Hub', url: 'https://www.mponline.gov.in/portal/CitizenHome.aspx', category: 'Madhya Pradesh', department: 'E-Services' },
  { id: 'mp-edistrict', name: 'Madhya Pradesh e-District Administration Portal', url: 'https://mpedistrict.gov.in/', category: 'Madhya Pradesh', department: 'E-Services' },
  { id: 'mp-services', name: 'Madhya Pradesh Unified State Digital Services', url: 'https://mp.gov.in/services', category: 'Madhya Pradesh', department: 'E-Services' },
  { id: 'mp-loksewa', name: 'Madhya Pradesh Lok Sewa Guarantee Portal Office', url: 'https://www.lokseva.gov.in/', category: 'Madhya Pradesh', department: 'E-Services' },

  // Gazettes & Orders
  { id: 'mp-egazette', name: 'Madhya Pradesh Official State e-Gazette Desk', url: 'https://mp.gov.in/gazette', category: 'Madhya Pradesh', department: 'Government Gazettes' },
  { id: 'mp-go-portal', name: 'Madhya Pradesh Government Orders Database Portal', url: 'https://mp.gov.in/government-orders', category: 'Madhya Pradesh', department: 'Government Gazettes' },

  // Cooperative
  { id: 'mp-cooperative', name: 'Madhya Pradesh Commission of Cooperative Societies', url: 'https://cooperation.mp.gov.in/', category: 'Madhya Pradesh', department: 'Administrative Units' },
  { id: 'mp-cooperative-bank', name: 'Madhya Pradesh State Cooperative Apex Bank Hub', url: 'https://mpcooperativebank.in/', category: 'Madhya Pradesh', department: 'Administrative Units' },

  // Industries & Trade
  { id: 'mp-industries', name: 'Madhya Pradesh Directorate of Industries Commerce', url: 'https://industries.mp.gov.in/', category: 'Madhya Pradesh', department: 'Industries & IT' },
  { id: 'mp-msme-board', name: 'Madhya Pradesh MSME Development Department Office', url: 'https://msme.mp.gov.in/', category: 'Madhya Pradesh', department: 'Industries & IT' },
  { id: 'mp-trade-promo', name: 'Madhya Pradesh State Trade Promotion Board', url: 'https://trade.mp.gov.in/', category: 'Madhya Pradesh', department: 'Industries & IT' },
  { id: 'mp-startup', name: 'Madhya Pradesh Startup & Innovation Center Window', url: 'https://startup.mp.gov.in/', category: 'Madhya Pradesh', department: 'Employment Services' },

  // Important Portals & Helplines
  { id: 'mp-tourism', name: 'Madhya Pradesh Tourism Development Board', url: 'https://mptourism.co.in/', category: 'Madhya Pradesh', department: 'Tourism & Culture' },
  { id: 'mp-skill-dev', name: 'Madhya Pradesh Skill Development Center', url: 'https://mpskildev.org/', category: 'Madhya Pradesh', department: 'Employment Services' },
  { id: 'mp-youth', name: 'Madhya Pradesh Youth Affairs Directorate', url: 'https://youth.mp.gov.in/', category: 'Madhya Pradesh', department: 'Tourism & Culture' },
  { id: 'mp-sports', name: 'Madhya Pradesh Sports & Welfare Department', url: 'https://sports.mp.gov.in/', category: 'Madhya Pradesh', department: 'Tourism & Culture' },
  { id: 'mp-environment', name: 'Madhya Pradesh State Environment Department', url: 'https://envcom.mp.gov.in/', category: 'Madhya Pradesh', department: 'Forest & Environment' },
  { id: 'mp-disaster-mgmt', name: 'Madhya Pradesh State Disaster Management Agency', url: 'https://wbdmd.gov.in/', category: 'Madhya Pradesh', department: 'Police & Security' },
  { id: 'mp-irrigation-dept', name: 'Madhya Pradesh Department of Irrigation Support', url: 'https://mp.gov.in/departments/irrigation', category: 'Madhya Pradesh', department: 'Transport & Infrastructure' },
  { id: 'mp-food-supplies', name: 'Madhya Pradesh Food & Civil Supplies Corporation', url: 'https://fcsupp.mp.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-water-resources', name: 'Madhya Pradesh Water Resources Department', url: 'https://irrigation.mp.gov.in/', category: 'Madhya Pradesh', department: 'Transport & Infrastructure' },
  { id: 'mp-chamber-commerce', name: 'Madhya Pradesh Chamber of Commerce & Industry', url: 'https://mpcc.in/', category: 'Madhya Pradesh', department: 'Industries & IT' },
  { id: 'mp-cm-helpline', name: 'Madhya Pradesh Chief Minister Helpline 181 Desk', url: 'https://cmhelpline.mp.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },
  { id: 'mp-cm-dashboard', name: 'Madhya Pradesh State CM Interactive Dashboard', url: 'https://cmdashboard.mp.gov.in/', category: 'Madhya Pradesh', department: 'Administration' },

  // --- RAJASTHAN GOVERNMENT WEBSITES ---
  // Main State Portals & Info
  { id: 'rj-portal', name: 'Rajasthan State Government Portal', url: 'https://rajasthan.gov.in/', category: 'Rajasthan', department: 'Main State Portal' },
  { id: 'rj-portal-alt', name: 'NIC Rajasthan Government Center', url: 'https://raj.nic.in/', category: 'Rajasthan', department: 'Main State Portal' },
  { id: 'rj-cmo', name: 'Rajasthan Chief Minister Office (CMO)', url: 'https://cmo.rajasthan.gov.in/', category: 'Rajasthan', department: 'Administration' },
  { id: 'rj-cmo-releases', name: 'Rajasthan CM Press Releases Desk', url: 'https://cmo.rajasthan.gov.in/press-releases', category: 'Rajasthan', department: 'Administration' },
  { id: 'rj-latest-news', name: 'Rajasthan State Latest News Desk', url: 'https://rajasthan.gov.in/news', category: 'Rajasthan', department: 'Administration' },
  { id: 'rj-jan-soochna', name: 'Rajasthan Jan Soochna Portal (Citizen Transparency)', url: 'https://jansoochna.rajasthan.gov.in/', category: 'Rajasthan', department: 'Administration' },

  // RPSC
  { id: 'rj-psc', name: 'Rajasthan Public Service Commission (RPSC)', url: 'https://rpsc.rajasthan.gov.in/', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-psc-results', name: 'RPSC Exam Results & Declarations Desk', url: 'https://rpsc.rajasthan.gov.in/results', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-psc-calendar', name: 'RPSC Recruitment Official Exam Calendar', url: 'https://rpsc.rajasthan.gov.in/exam-calendar', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-psc-app', name: 'RPSC Interactive Application Intake Portal', url: 'https://rpsc.rajasthan.gov.in/application', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-ppm', name: 'Rajasthan Government RajPTM Portal (RPPM)', url: 'https://rppm.rajasthan.gov.in/', category: 'Rajasthan', department: 'Recruitment Board' },

  // RSMSSB
  { id: 'rj-ssc', name: 'Rajasthan Staff Selection Board (RSMSSB)', url: 'https://rsmssb.rajasthan.gov.in/', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-ssc-results', name: 'RSMSSB Selectees & Final Results Desk', url: 'https://rsmssb.rajasthan.gov.in/results', category: 'Rajasthan', department: 'Recruitment Board' },
  { id: 'rj-ssc-app', name: 'RSMSSB Interactive Application System', url: 'https://rsmssb.rajasthan.gov.in/application', category: 'Rajasthan', department: 'Recruitment Board' },

  // Police & Fire
  { id: 'rj-police-main', name: 'Rajasthan State Police Headquarters', url: 'https://police.rajasthan.gov.in/', category: 'Rajasthan', department: 'Police & Security' },
  { id: 'rj-police', name: 'Rajasthan Police Official Recruitment Cell', url: 'https://police.rajasthan.gov.in/en/recruitment', category: 'Rajasthan', department: 'Police & Security' },
  { id: 'rj-police-constable', name: 'Rajasthan Police Constable Active Careers', url: 'https://police.rajasthan.gov.in/en/recruitment', category: 'Rajasthan', department: 'Police & Security' },
  { id: 'rj-police-si', name: 'Rajasthan Police Sub-Inspector Openings', url: 'https://police.rajasthan.gov.in/en/recruitment', category: 'Rajasthan', department: 'Police & Security' },
  { id: 'rj-fire-force', name: 'Rajasthan Fire Force & Emergency Services', url: 'https://fire.rajasthan.gov.in/', category: 'Rajasthan', department: 'Police & Security' },

  // Teachers / Education
  { id: 'rj-education', name: 'Rajasthan School Education Department (Edureni)', url: 'https://edureni.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-teachers', name: 'Rajasthan Teacher Eligibility Test (TET)', url: 'https://rajeduboard.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-trb', name: 'Rajasthan Teacher Recruitment Board Cell', url: 'https://edureni.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-pgt-tgt', name: 'Rajasthan PGT/TGT Deployments System', url: 'https://edureni.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-school-teachers', name: 'Rajasthan School Teachers Allocation Desk', url: 'https://edureni.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-education-sec', name: 'Rajasthan Secondary Education Board Office', url: 'https://rajeduboard.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-bed', name: 'Rajasthan Professional B.Ed Admissions Office', url: 'https://dte.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },

  // Health
  { id: 'rj-health', name: 'Rajasthan Medical & Health (Rajswasthya)', url: 'https://rajswasthya.nic.in/', category: 'Rajasthan', department: 'Health Department' },
  { id: 'rj-health-medical', name: 'Rajasthan Directorate of Health Services', url: 'https://healthservices.rajasthan.gov.in/', category: 'Rajasthan', department: 'Health Department' },
  { id: 'rj-health-nursing', name: 'Rajasthan Nursing and Midwives Council', url: 'https://nursing.rajasthan.gov.in/', category: 'Rajasthan', department: 'Health Department' },
  { id: 'rj-health-ayush', name: 'Rajasthan State AYUSH Admissions Board', url: 'https://ayush.rajasthan.gov.in/', category: 'Rajasthan', department: 'Health Department' },
  { id: 'rj-health-med-edu', name: 'Rajasthan Directorate of Medical Education', url: 'https://medicaleducation.rajasthan.gov.in/', category: 'Rajasthan', department: 'Health Department' },

  // Agriculture & Forest
  { id: 'rj-agri', name: 'Rajasthan Agriculture Department (Krishi Portal)', url: 'https://krishi.rajasthan.gov.in/', category: 'Rajasthan', department: 'Agriculture Department' },
  { id: 'rj-horticulture', name: 'Rajasthan Directorate of Horticulture Food', url: 'https://horticulture.rajasthan.gov.in/', category: 'Rajasthan', department: 'Agriculture Department' },
  { id: 'rj-forest', name: 'Rajasthan Forest Environment & Wildlife Agency', url: 'https://forest.rajasthan.gov.in/', category: 'Rajasthan', department: 'Forest & Environment' },
  { id: 'rj-animal-husbandry', name: 'Rajasthan Animal Husbandry Services Unit', url: 'https://ah.rajasthan.gov.in/', category: 'Rajasthan', department: 'Agriculture Department' },
  { id: 'rj-fisheries', name: 'Rajasthan Fisheries Development Authority', url: 'https://fisheries.rajasthan.gov.in/', category: 'Rajasthan', department: 'Agriculture Department' },

  // Transport
  { id: 'rj-transport', name: 'Rajasthan State Transport Department Office', url: 'https://transport.rajasthan.gov.in/', category: 'Rajasthan', department: 'Transport & Infrastructure' },
  { id: 'rj-srtc', name: 'Rajasthan State Road Transport (RSRTC)', url: 'https://rsrtc.rajasthan.gov.in/', category: 'Rajasthan', department: 'Transport & Infrastructure' },

  // Power & Electricity
  { id: 'rj-power', name: 'Rajasthan State Department of Power Office', url: 'https://power.rajasthan.gov.in/', category: 'Rajasthan', department: 'Power Sector' },
  { id: 'rj-gcl', name: 'Rajasthan Power General Corp (RPGCL)', url: 'https://rpgcl.rajasthan.gov.in/', category: 'Rajasthan', department: 'Power Sector' },
  { id: 'rj-vidyut', name: 'Rajasthan Vidyut Prasaran & Distribution Hub', url: 'https://rajasthanvidyut.com/', category: 'Rajasthan', department: 'Power Sector' },

  // Panchayat / Rural Dev
  { id: 'rj-panchayat', name: 'Rajasthan Panchayat Raj Department Office', url: 'https://panchayat.rajasthan.gov.in/', category: 'Rajasthan', department: 'Rural Development' },
  { id: 'rj-gramin', name: 'Rajasthan Gramin Unified Rural Department', url: 'https://gramin.rajasthan.gov.in/', category: 'Rajasthan', department: 'Rural Development' },
  { id: 'rj-nrega', name: 'MGNREGA Rajasthan Job Card Information Desk', url: 'https://nrega.rajasthan.gov.in/', category: 'Rajasthan', department: 'Rural Development' },

  // Revenue & Land
  { id: 'rj-revenue', name: 'Rajasthan Revenue & Reforms Department', url: 'https://revenue.rajasthan.gov.in/', category: 'Rajasthan', department: 'Revenue & Land Records' },
  { id: 'rj-revenue-board', name: 'Rajasthan State Board of Revenue (BOR)', url: 'https://bor.rajasthan.gov.in/', category: 'Rajasthan', department: 'Revenue & Land Records' },
  { id: 'rj-land-records', name: 'Rajasthan Bhulekh Lands Unified System', url: 'https://bhulekh.rajasthan.gov.in/', category: 'Rajasthan', department: 'Revenue & Land Records' },
  { id: 'rj-bhunaksha', name: 'Rajasthan Bhunaksha Interactive Cadastral Maps', url: 'https://bhunaksha.rajasthan.gov.in/', category: 'Rajasthan', department: 'Revenue & Land Records' },
  { id: 'rj-registration', name: 'Rajasthan Stamp and Registration Service', url: 'https://registration.rajasthan.gov.in/', category: 'Rajasthan', department: 'Revenue & Land Records' },

  // Housing & Urban
  { id: 'rj-housing', name: 'Rajasthan State Housing Board Office', url: 'https://housing.rajasthan.gov.in/', category: 'Rajasthan', department: 'Housing & Urban Development' },
  { id: 'rj-lmws', name: 'Rajasthan Lands & Municipal Work Services (LMWS)', url: 'https://lmws.rajasthan.gov.in/', category: 'Rajasthan', department: 'Housing & Urban Development' },
  { id: 'rj-municipal', name: 'Rajasthan Municipal Administration System', url: 'https://municipal.rajasthan.gov.in/', category: 'Rajasthan', department: 'Housing & Urban Development' },
  { id: 'rj-urban-dev', name: 'Rajasthan Urban Development Department (UDD)', url: 'https://udd.rajasthan.gov.in/', category: 'Rajasthan', department: 'Housing & Urban Development' },

  // Finance & Taxes
  { id: 'rj-finance', name: 'Rajasthan State Finance Department Office', url: 'https://finance.rajasthan.gov.in/', category: 'Rajasthan', department: 'Administration' },
  { id: 'rj-commercial-tax', name: 'Rajasthan Commercial Taxes (Mahavat Console)', url: 'https://mahavat.rajasthan.gov.in/', category: 'Rajasthan', department: 'Administration' },
  { id: 'rj-excise', name: 'Rajasthan State Prohibition & Excise Office', url: 'https://excise.rajasthan.gov.in/', category: 'Rajasthan', department: 'Administration' },
  { id: 'rj-tax-board', name: 'Rajasthan State Tax Board Administration', url: 'https://rajtaxboard.gov.in/', category: 'Rajasthan', department: 'Administration' },

  // Welfare Schemes
  { id: 'rj-scst-welfare', name: 'Rajasthan Caste & Tribe Integration Board', url: 'https://stwelfare.rajasthan.gov.in/', category: 'Rajasthan', department: 'Welfare Schemes' },
  { id: 'rj-bc-welfare', name: 'Rajasthan Backward Classes Development Desk', url: 'https://bcwelfare.rajasthan.gov.in/', category: 'Rajasthan', department: 'Welfare Schemes' },
  { id: 'rj-minority-welfare', name: 'Rajasthan Minority Development Department', url: 'https://minority.rajasthan.gov.in/', category: 'Rajasthan', department: 'Welfare Schemes' },
  { id: 'rj-wcd', name: 'Rajasthan Women and Child Development (WCD)', url: 'https://wcd.rajasthan.gov.in/', category: 'Rajasthan', department: 'Welfare Schemes' },
  { id: 'rj-social-justice', name: 'Rajasthan Social Justice & Disability Integration', url: 'https://socialjustice.rajasthan.gov.in/', category: 'Rajasthan', department: 'Welfare Schemes' },
  { id: 'rj-disability', name: 'Rajasthan Differently Abled Persons Welfare', url: 'https://disability.rajasthan.gov.in/', category: 'Rajasthan', department: 'Welfare Schemes' },

  // Education Higher
  { id: 'rj-higher-education', name: 'Rajasthan Higher Education Directorate', url: 'https://he.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-technical-education', name: 'Rajasthan Directorate of Technical Education', url: 'https://dte.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-school-board', name: 'Rajasthan Board of Secondary Education Secondary', url: 'https://rajeduboard.rajasthan.gov.in/', category: 'Rajasthan', department: 'Education Department' },
  { id: 'rj-university', name: 'University of Rajasthan Main Campus (Uniraj)', url: 'https://uniraj.ac.in/', category: 'Rajasthan', department: 'Education Department' },

  // Law & High Court
  { id: 'rj-high-court', name: 'Rajasthan High Court Judicial Recruitment Office', url: 'https://rajhighcourt.gov.in/', category: 'Rajasthan', department: 'Government Gazettes' },
  { id: 'rj-acb', name: 'Rajasthan Anti Corruption Bureau (ACB)', url: 'https://acb.rajasthan.gov.in/', category: 'Rajasthan', department: 'Administration' },

  // E-Services
  { id: 'rj-online', name: 'RajComp Info Services (Online Systems Desk)', url: 'https://rajcomp.rajasthan.gov.in/', category: 'Rajasthan', department: 'E-Services' },
  { id: 'rj-sso', name: 'Rajasthan SSO Single Sign On Identity Hub', url: 'https://sso.rajasthan.gov.in/', category: 'Rajasthan', department: 'E-Services' },
  { id: 'rj-edistrict', name: 'Rajasthan e-District Citizen Services Office', url: 'https://edistrict.rajasthan.gov.in/', category: 'Rajasthan', department: 'E-Services' },
  { id: 'rj-services', name: 'Rajasthan Unified State Digital Services', url: 'https://rajasthan.gov.in/services', category: 'Rajasthan', department: 'E-Services' },

  // Other Portals
  { id: 'rj-tourism', name: 'Rajasthan Tourism Development Corporation (RTDC)', url: 'https://tourism.rajasthan.gov.in/', category: 'Rajasthan', department: 'Tourism & Culture' },
  { id: 'rj-skill-dev', name: 'Rajasthan Skill Development Mission Office', url: 'https://skil.rajasthan.gov.in/', category: 'Rajasthan', department: 'Employment Services' },
  { id: 'rj-youth', name: 'Rajasthan Directorate of Youth Affairs', url: 'https://youth.rajasthan.gov.in/', category: 'Rajasthan', department: 'Tourism & Culture' },
  { id: 'rj-sports', name: 'Rajasthan Sports Council and Welfare Department', url: 'https://sports.rajasthan.gov.in/', category: 'Rajasthan', department: 'Tourism & Culture' },
  { id: 'rj-mines', name: 'Rajasthan Mines & Geological Survey Directorate', url: 'https://mines.rajasthan.gov.in/', category: 'Rajasthan', department: 'Industries & IT' },
  { id: 'rj-industries', name: 'Rajasthan Directorate of Industries & Commerce', url: 'https://industries.rajasthan.gov.in/', category: 'Rajasthan', department: 'Industries & IT' },
  { id: 'rj-msme', name: 'Rajasthan MSME Business Incubation Center', url: 'https://msme.rajasthan.gov.in/', category: 'Rajasthan', department: 'Employment Services' },
  { id: 'rj-cooperative', name: 'Rajasthan Commission of Cooperative Societies', url: 'https://cooperation.rajasthan.gov.in/', category: 'Rajasthan', department: 'Administrative Units' },


  // --- GUJARAT GOVERNMENT WEBSITES ---
  // Main State Portals & Info
  { id: 'gj-portal', name: 'Gujarat State Government Portal (Main)', url: 'https://gujarat.gov.in/', category: 'Gujarat', department: 'Main State Portal' },
  { id: 'gj-portal-alt', name: 'Gujarat India National Portal Center', url: 'https://gujaratindia.gov.in/', category: 'Gujarat', department: 'Main State Portal' },
  { id: 'gj-cmo', name: 'Gujarat Chief Minister Office (CMO)', url: 'https://cmo.gujarat.gov.in/', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-cmo-releases', name: 'Gujarat State Press Releases Desk', url: 'https://gujarat.gov.in/press-releases', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-latest-news', name: 'Gujarat Government Latest News Grid', url: 'https://gujarat.gov.in/news', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-mygov', name: 'MyGov Gujarat Citizen Discussion Board', url: 'https://gujarat.mygov.in/', category: 'Gujarat', department: 'Administration' },

  // GPSC
  { id: 'gj-psc', name: 'Gujarat Public Service Commission (GPSC)', url: 'https://gpsc.gujarat.gov.in/', category: 'Gujarat', department: 'Recruitment Board' },
  { id: 'gj-psc-results', name: 'GPSC Exam & Recruitment Selection Results', url: 'https://gpsc.gujarat.gov.in/results', category: 'Gujarat', department: 'Recruitment Board' },
  { id: 'gj-psc-calendar', name: 'GPSC Official Recruitment Exam Calendar', url: 'https://gpsc.gujarat.gov.in/exam-calendar', category: 'Gujarat', department: 'Recruitment Board' },
  { id: 'gj-psc-app', name: 'GPSC Interactive Online Application Portal', url: 'https://gpsc.gujarat.gov.in/application', category: 'Gujarat', department: 'Recruitment Board' },

  // GSSSB
  { id: 'gj-sssb', name: 'Gujarat Subordinate Service Selection Board (GSSSB)', url: 'https://gsssb.gujarat.gov.in/', category: 'Gujarat', department: 'Recruitment Board' },
  { id: 'gj-sssb-results', name: 'GSSSB Competitive Exam Results Selection', url: 'https://gsssb.gujarat.gov.in/results', category: 'Gujarat', department: 'Recruitment Board' },
  { id: 'gj-sssb-app', name: 'GSSSB Direct Application Intake System', url: 'https://gsssb.gujarat.gov.in/application', category: 'Gujarat', department: 'Recruitment Board' },

  // Police & Fire
  { id: 'gj-police-main', name: 'Gujarat Police Headquarters Portal', url: 'https://police.gujarat.gov.in/', category: 'Gujarat', department: 'Police & Security' },
  { id: 'gj-police', name: 'Gujarat Police Recruitment Bureau (En/Rec)', url: 'https://police.gujarat.gov.in/en/recruitment', category: 'Gujarat', department: 'Police & Security' },
  { id: 'gj-police-constable', name: 'Gujarat Police Constable Careers Center', url: 'https://police.gujarat.gov.in/en/recruitment', category: 'Gujarat', department: 'Police & Security' },
  { id: 'gj-police-si', name: 'Gujarat Police Sub-Inspector Openings', url: 'https://police.gujarat.gov.in/en/recruitment', category: 'Gujarat', department: 'Police & Security' },
  { id: 'gj-fire-force', name: 'Gujarat State Fire & Rescue Services Board', url: 'https://fireandrescue.gujarat.gov.in/', category: 'Gujarat', department: 'Police & Security' },
  { id: 'gj-acb', name: 'Gujarat Anti Corruption Bureau (ACB)', url: 'https://acb.gujarat.gov.in/', category: 'Gujarat', department: 'Administration' },

  // Teachers / Education Recruitment
  { id: 'gj-education', name: 'Gujarat Education Department Office', url: 'https://education.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-teachers', name: 'Gujarat Teacher Eligibility Test (TET)', url: 'https://tet.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-trb', name: 'Gujarat Teacher Recruitment Board Office', url: 'https://education.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-pgt-tgt', name: 'Gujarat PGT/TGT Teacher Placements Office', url: 'https://education.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-school-teachers', name: 'Gujarat School Teachers District Allocation', url: 'https://education.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-secondary-board', name: 'Gujarat Secondary & Higher Exam Council (SEB)', url: 'https://sebexam.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-bed', name: 'Gujarat Professional B.Ed Admissions Office', url: 'https://dte.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-hse', name: 'Gujarat Higher Secondary Board Office', url: 'https://hse.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },

  // Health
  { id: 'gj-health', name: 'Gujarat Public Health & Family Welfare Office', url: 'https://health.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },
  { id: 'gj-health-medical', name: 'Gujarat Directorate of Health Services', url: 'https://healthservices.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },
  { id: 'gj-health-nursing', name: 'Gujarat Nursing and Midwives Council Office', url: 'https://nursing.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },
  { id: 'gj-health-ayush', name: 'Gujarat State AYUSH Admissions Board', url: 'https://ayush.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },
  { id: 'gj-health-phc', name: 'Gujarat Community & Primary Health Directory', url: 'https://health.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },
  { id: 'gj-health-fw', name: 'Gujarat Family Welfare Services Division', url: 'https://fw.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },
  { id: 'gj-health-med-edu', name: 'Gujarat Directorate of Medical Education', url: 'https://medicaleducation.gujarat.gov.in/', category: 'Gujarat', department: 'Health Department' },

  // Agriculture & Forest
  { id: 'gj-agri', name: 'Gujarat Agriculture Progress Department', url: 'https://agriculture.gujarat.gov.in/', category: 'Gujarat', department: 'Agriculture Department' },
  { id: 'gj-horticulture', name: 'Gujarat Directorate of Horticulture', url: 'https://horticulture.gujarat.gov.in/', category: 'Gujarat', department: 'Agriculture Department' },
  { id: 'gj-forest', name: 'Gujarat Environment, Forests & Wildlife office', url: 'https://forest.gujarat.gov.in/', category: 'Gujarat', department: 'Forest & Environment' },
  { id: 'gj-animal-husbandry', name: 'Gujarat Animal Husbandry Commission Unit', url: 'https://ah.gujarat.gov.in/', category: 'Gujarat', department: 'Agriculture Department' },
  { id: 'gj-fisheries', name: 'Gujarat State Fisheries Development Authority', url: 'https://fisheries.gujarat.gov.in/', category: 'Gujarat', department: 'Agriculture Department' },
  { id: 'gj-soil-conservation', name: 'Gujarat Soil & Water Conservation Directorate', url: 'https://soilconservation.gujarat.gov.in/', category: 'Gujarat', department: 'Agriculture Department' },
  { id: 'gj-dairy', name: 'Gujarat Dairy Cooperatives Development Board', url: 'https://www.gujarstdairy.com/', category: 'Gujarat', department: 'Agriculture Department' },

  // Transport
  { id: 'gj-transport', name: 'Gujarat State Port & Transport Department', url: 'https://transport.gujarat.gov.in/', category: 'Gujarat', department: 'Transport & Infrastructure' },
  { id: 'gj-srtc', name: 'Gujarat State Road Transport (GSRTC)', url: 'https://gsrtc.gujarat.gov.in/', category: 'Gujarat', department: 'Transport & Infrastructure' },

  // Power / Water Engineering
  { id: 'gj-power', name: 'Gujarat Department of Power and Energy Office', url: 'https://power.gujarat.gov.in/', category: 'Gujarat', department: 'Power Sector' },
  { id: 'gj-uhbvn', name: 'Gujarat Uttar Haryana Bijli Vitran (UHBVN) Agency', url: 'https://uhbvn.gujarat.gov.in/', category: 'Gujarat', department: 'Power Sector' },
  { id: 'gj-ggsec', name: 'Guru Gobind Singh Energy Centre (GGSEC)', url: 'https://ggsec.gujarat.gov.in/', category: 'Gujarat', department: 'Power Sector' },
  { id: 'gj-vidyut', name: 'Gujarat Urja Vidyut Parasaran Corporation', url: 'https://gujaratvidyut.com/', category: 'Gujarat', department: 'Power Sector' },

  // Panchayat / Rural Dev
  { id: 'gj-panchayat', name: 'Gujarat Panchayat Raj Development Department', url: 'https://panchayat.gujarat.gov.in/', category: 'Gujarat', department: 'Rural Development' },
  { id: 'gj-rural-dev', name: 'Gujarat Rural Development Commission', url: 'https://rd.gujarat.gov.in/', category: 'Gujarat', department: 'Rural Development' },
  { id: 'gj-nrega', name: 'MGNREGA Gujarat Job Card Information System', url: 'https://nrega.gujarat.gov.in/', category: 'Gujarat', department: 'Rural Development' },

  // Revenue & Lands
  { id: 'gj-revenue', name: 'Gujarat State Revenue and Reforms Office', url: 'https://revenue.gujarat.gov.in/', category: 'Gujarat', department: 'Revenue & Land Records' },
  { id: 'gj-land-records', name: 'Gujarat AnyTimeProperty Land Records System', url: 'https://anytimeproperty.gujarat.gov.in/', category: 'Gujarat', department: 'Revenue & Land Records' },
  { id: 'gj-registration', name: 'Gujarat Stamp Registration (IGRIP Portal)', url: 'https://anytimeproperty.gujarat.gov.in/', category: 'Gujarat', department: 'Revenue & Land Records' },
  { id: 'gj-revenue-board', name: 'Gujarat State Board of Revenue Administration', url: 'https://revenue.gujarat.gov.in/', category: 'Gujarat', department: 'Revenue & Land Records' },

  // Housing & Urban
  { id: 'gj-housing', name: 'Gujarat State Housing Board Office', url: 'https://housing.gujarat.gov.in/', category: 'Gujarat', department: 'Housing & Urban Development' },
  { id: 'gj-municipal', name: 'Gujarat Municipal Affairs Administration', url: 'https://municipal.gujarat.gov.in/', category: 'Gujarat', department: 'Housing & Urban Development' },
  { id: 'gj-urban-dev', name: 'Gujarat Urban Administration & Development', url: 'https://udd.gujarat.gov.in/', category: 'Gujarat', department: 'Housing & Urban Development' },
  { id: 'gj-amc', name: 'Ahmedabad Municipal Corporation (AMC)', url: 'https://amd.gujarat.gov.in/', category: 'Gujarat', department: 'Housing & Urban Development' },

  // Finance & Taxes
  { id: 'gj-finance', name: 'Gujarat State Finance Department Office', url: 'https://finance.gujarat.gov.in/', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-commercial-tax', name: 'Gujarat Excise & Commercial Tax Portal', url: 'https://tax.gujarat.gov.in/', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-excise', name: 'Gujarat State Prohibition and Excise Desk', url: 'https://excise.gujarat.gov.in/', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-entertainment-tax', name: 'Gujarat State Entertainment Tax Division', url: 'https://etax.gujarat.gov.in/', category: 'Gujarat', department: 'Administration' },

  // Welfare Schemes
  { id: 'gj-scst-welfare', name: 'Gujarat Schedule Tribe & Caste Development', url: 'https://stwelfare.gujarat.gov.in/', category: 'Gujarat', department: 'Welfare Schemes' },
  { id: 'gj-bc-welfare', name: 'Gujarat Backward Classes Kalyan Board Office', url: 'https://bcwelfare.gujarat.gov.in/', category: 'Gujarat', department: 'Welfare Schemes' },
  { id: 'gj-minority-welfare', name: 'Gujarat Minority Development Department Office', url: 'https://minority.gujarat.gov.in/', category: 'Gujarat', department: 'Welfare Schemes' },
  { id: 'gj-wcd', name: 'Gujarat Women & Child Development Directorate', url: 'https://wcd.gujarat.gov.in/', category: 'Gujarat', department: 'Welfare Schemes' },
  { id: 'gj-social-justice', name: 'Gujarat Social Justice and Empowerment Office', url: 'https://socialjustice.gujarat.gov.in/', category: 'Gujarat', department: 'Welfare Schemes' },
  { id: 'gj-tribal-dev', name: 'Gujarat Adibasi Tribal Development Commission', url: 'https://tribal.gujarat.gov.in/', category: 'Gujarat', department: 'Welfare Schemes' },
  { id: 'gj-disability', name: 'Gujarat Differently Abled Persons Welfare Board', url: 'https://disability.gujarat.gov.in/', category: 'Gujarat', department: 'Welfare Schemes' },

  // Higher Ed
  { id: 'gj-higher-education', name: 'Gujarat Department of Higher Education Office', url: 'https://he.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-technical-education', name: 'Gujarat Directorate of Technical Education', url: 'https://dte.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-seb-exam', name: 'Gujarat Secondary Examination Board Portal', url: 'https://sebexam.gujarat.gov.in/', category: 'Gujarat', department: 'Education Department' },
  { id: 'gj-university', name: 'Gujarat State Central University (Ahmedabad)', url: 'https://gujaratuniversity.ac.in/', category: 'Gujarat', department: 'Education Department' },

  // Legal
  { id: 'gj-high-court', name: 'Gujarat High Court Judicial Recruitment office', url: 'https://gujarathighcourt.nic.in/', category: 'Gujarat', department: 'Government Gazettes' },
  { id: 'gj-prisons', name: 'Gujarat Directorate of Corrections & Prisons', url: 'https://prisons.gujarat.gov.in/', category: 'Gujarat', department: 'Police & Security' },

  // E-Services
  { id: 'gj-edistrict', name: 'Gujarat e-District Unified Administration', url: 'https://edistrict.gujarat.gov.in/', category: 'Gujarat', department: 'E-Services' },
  { id: 'gj-online', name: 'Maha Online Gujarat Digital Services Console', url: 'https://mahaonline.gujarat.gov.in/', category: 'Gujarat', department: 'E-Services' },
  { id: 'gj-services', name: 'Gujarat Unified State Digital Services Hub', url: 'https://gujarat.gov.in/services', category: 'Gujarat', department: 'E-Services' },
  { id: 'gj-seva', name: 'Gujarat Seva Unified Citizen Services Gateway', url: 'https://seva.gujarat.gov.in/', category: 'Gujarat', department: 'E-Services' },

  // Other Portals
  { id: 'gj-tourism', name: 'Gujarat Tourism Development Corporation Office', url: 'https://gujarattourism.gov.in/', category: 'Gujarat', department: 'Tourism & Culture' },
  { id: 'gj-skill-dev', name: 'Paschim Banga Gujarat Skill Development', url: 'https://skil.gujarat.gov.in/', category: 'Gujarat', department: 'Employment Services' },
  { id: 'gj-youth', name: 'Gujarat Youth Affairs Directorate Office', url: 'https://youth.gujarat.gov.in/', category: 'Gujarat', department: 'Tourism & Culture' },
  { id: 'gj-sports', name: 'Gujarat Sports Authority and Welfare Department', url: 'https://sports.gujarat.gov.in/', category: 'Gujarat', department: 'Tourism & Culture' },
  { id: 'gj-industries', name: 'Gujarat Directorate of Industries and Commerce', url: 'https://industries.gujarat.gov.in/', category: 'Gujarat', department: 'Industries & IT' },
  { id: 'gj-msme', name: 'Gujarat MSME Business Incubation Program Desk', url: 'https://msme.gujarat.gov.in/', category: 'Gujarat', department: 'Employment Services' },
  { id: 'gj-startup', name: 'Gujarat Startup Incubation Centers Network', url: 'https://startupindia.gujarat.gov.in/', category: 'Gujarat', department: 'Employment Services' },
  { id: 'gj-trade', name: 'Gujarat State Trade Promotion Corporation Office', url: 'https://trade.gujarat.gov.in/', category: 'Gujarat', department: 'Industries & IT' },
  { id: 'gj-maritime', name: 'Gujarat Maritime Board & Port Division Office', url: 'https://maritime.gujarat.gov.in/', category: 'Gujarat', department: 'Transport & Infrastructure' },
  { id: 'gj-ports', name: 'Gujarat Commerce & Ports Department Agency', url: 'https://ports.gujarat.gov.in/', category: 'Gujarat', department: 'Transport & Infrastructure' },
  { id: 'gj-environment', name: 'Gujarat State Environmental Quality Office', url: 'https://environment.gujarat.gov.in/', category: 'Gujarat', department: 'Forest & Environment' },
  { id: 'gj-disaster', name: 'Gujarat State Disaster Management Agency (GMDMA)', url: 'https://gmdma.gujarat.gov.in/', category: 'Gujarat', department: 'Police & Security' },
  { id: 'gj-food', name: 'Gujarat Food, Supplies & Civil Distribution Desk', url: 'https://food.gujarat.gov.in/', category: 'Gujarat', department: 'Administration' },
  { id: 'gj-water', name: 'Gujarat Water Resources Development Council', url: 'https://waterresources.gujarat.gov.in/', category: 'Gujarat', department: 'Transport & Infrastructure' },
  { id: 'gj-irrigation', name: 'Gujarat Department of Integrated Irrigation', url: 'https://irrigation.gujarat.gov.in/', category: 'Gujarat', department: 'Transport & Infrastructure' },

  // --- ODISHA GOVERNMENT WEBSITES ---
  // Main State Portals & Info
  { id: 'od-portal', name: 'Odisha State Government Portal (Official)', url: 'https://odisha.gov.in/', category: 'Odisha', department: 'Main State Portal' },
  { id: 'od-portal-alt', name: 'NIC Odisha National Informatics Center', url: 'https://odisha.nic.in/', category: 'Odisha', department: 'Main State Portal' },
  { id: 'od-cmo', name: 'Odisha Chief Minister Office (CMO)', url: 'https://cmo.odisha.gov.in/', category: 'Odisha', department: 'Administration' },
  { id: 'od-cmo-releases', name: 'Odisha CM Press Releases Desk', url: 'https://cmo.odisha.gov.in/press-releases', category: 'Odisha', department: 'Administration' },
  { id: 'od-latest-news', name: 'Odisha State Latest News & Events Desk', url: 'https://odisha.gov.in/news-and-events', category: 'Odisha', department: 'Administration' },
  { id: 'od-one-portal', name: 'Odisha One Portal Citizen Gateway', url: 'https://www.odishaone.gov.in/', category: 'Odisha', department: 'Administration' },

  // OPSC
  { id: 'od-psc', name: 'Odisha Public Service Commission (OPSC)', url: 'https://opsc.gov.in/', category: 'Odisha', department: 'Recruitment Board' },
  { id: 'od-psc-online', name: 'OPSC Online Application Intake Page (OSSE)', url: 'https://osse.odisha.gov.in/', category: 'Odisha', department: 'Recruitment Board' },
  { id: 'od-psc-results', name: 'OPSC Exam Results & Selectees Desk', url: 'https://opsc.gov.in/results', category: 'Odisha', department: 'Recruitment Board' },
  { id: 'od-psc-calendar', name: 'OPSC Recruitment Official Exam Calendar', url: 'https://opsc.getjobs.com/exam-calendar', category: 'Odisha', department: 'Recruitment Board' },

  // OSSC
  { id: 'od-ssc', name: 'Odisha Staff Selection Commission (OSSC)', url: 'https://ossc.gov.in/', category: 'Odisha', department: 'Recruitment Board' },
  { id: 'od-ssc-results', name: 'OSSC Competitive Exam Results List', url: 'https://ossc.gov.in/results', category: 'Odisha', department: 'Recruitment Board' },
  { id: 'od-ssc-app', name: 'OSSC Online Application Admissions Hub', url: 'https://ossc.gov.in/application', category: 'Odisha', department: 'Recruitment Board' },

  // Police & Fire
  { id: 'od-police', name: 'Odisha Police Headquarters Portal', url: 'https://police.odisha.gov.in/', category: 'Odisha', department: 'Police & Security' },
  { id: 'od-police-rec', name: 'Odisha Police Official Recruitment Bureau', url: 'https://police.odisha.gov.in/en/recruitment', category: 'Odisha', department: 'Police & Security' },
  { id: 'od-police-constable', name: 'Odisha Police Constable Active Careers', url: 'https://police.odisha.gov.in/en/recruitment', category: 'Odisha', department: 'Police & Security' },
  { id: 'od-police-si', name: 'Odisha Police Sub-Inspector Job Openings', url: 'https://police.odisha.gov.in/en/recruitment', category: 'Odisha', department: 'Police & Security' },
  { id: 'od-fire-force', name: 'Odisha Fire Force and Disaster Services', url: 'https://fire.odisha.gov.in/', category: 'Odisha', department: 'Police & Security' },

  // Education / Teachers Recruitment
  { id: 'od-education', name: 'Odisha School & Mass Education Department', url: 'https://education.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-teachers', name: 'Odisha Teacher Eligibility Test (OTET)', url: 'https://odshs.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-tre', name: 'Odisha Teacher Recruitment Exam (TRE) Council', url: 'https://odsha.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-pgt-tgt', name: 'Odisha PGT/TGT Teacher Deployment Portal', url: 'https://education.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-school-teachers', name: 'Odisha School Teachers Cadre Allocation', url: 'https://education.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-secondary-board', name: 'Board of Secondary Education Odisha (BSE)', url: 'https://bseodisha.ac.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-bed', name: 'Odisha Professional B.Ed Admissions Office', url: 'https://dte.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },

  // Health
  { id: 'od-health', name: 'Odisha Health & Family Welfare Department', url: 'https://health.odisha.gov.in/', category: 'Odisha', department: 'Health Department' },
  { id: 'od-health-medical', name: 'Odisha Directorate of Health Services Office', url: 'https://healthservices.odisha.gov.in/', category: 'Odisha', department: 'Health Department' },
  { id: 'od-health-nursing', name: 'Odisha Nursing and Midwives Council Office', url: 'https://nursing.odisha.gov.in/', category: 'Odisha', department: 'Health Department' },
  { id: 'od-health-ayush', name: 'Odisha State Directorate of AYUSH Systems', url: 'https://ayush.odisha.gov.in/', category: 'Odisha', department: 'Health Department' },
  { id: 'od-health-med-edu', name: 'Odisha Directorate of Medical Education (DMET)', url: 'https://medicaleducation.odisha.gov.in/', category: 'Odisha', department: 'Health Department' },

  // Agriculture & Forest
  { id: 'od-agri', name: 'Odisha Agriculture & Farmers Empowerment Office', url: 'https://agriculture.odisha.gov.in/', category: 'Odisha', department: 'Agriculture Department' },
  { id: 'od-horticulture', name: 'Odisha Directorate of Horticulture Progress', url: 'https://horticulture.odisha.gov.in/', category: 'Odisha', department: 'Agriculture Department' },
  { id: 'od-forest', name: 'Odisha Forest, Environment & Climate Change', url: 'https://forest.odisha.gov.in/', category: 'Odisha', department: 'Forest & Environment' },
  { id: 'od-animal-husbandry', name: 'Odisha Fisheries & Animal Resources Dep', url: 'https://ah.odisha.gov.in/', category: 'Odisha', department: 'Agriculture Department' },
  { id: 'od-fisheries', name: 'Odisha Director of Fisheries Inland & Marine', url: 'https://fisheries.odisha.gov.in/', category: 'Odisha', department: 'Agriculture Department' },

  // Transport
  { id: 'od-transport', name: 'Odisha Commerce & Transport Department Office', url: 'https://transport.odisha.gov.in/', category: 'Odisha', department: 'Transport & Infrastructure' },
  { id: 'od-srtc', name: 'Odisha State Road Transport Corporation (OSRTC)', url: 'https://osrtc.odisha.gov.in/', category: 'Odisha', department: 'Transport & Infrastructure' },

  // Power & Electricity
  { id: 'od-power', name: 'Odisha Department of Energy grid and Power', url: 'https://power.odisha.gov.in/', category: 'Odisha', department: 'Power Sector' },
  { id: 'od-gridco', name: 'Grid Corporation of Odisha (GRIDCO Ltd)', url: 'https://gridco.odisha.gov.in/', category: 'Odisha', department: 'Power Sector' },
  { id: 'od-discom', name: 'Odisha Utility Joint Electricity Distribution (DISCOM)', url: 'https://discom.odisha.gov.in/', category: 'Odisha', department: 'Power Sector' },
  { id: 'od-vidyut', name: 'Odisha Vidyut Prasaran & Generation Hub', url: 'https://odishapower.com/', category: 'Odisha', department: 'Power Sector' },

  // Panchayat / Rural Dev
  { id: 'od-panchayat', name: 'Odisha Panchayati Raj & Drinking Water', url: 'https://panchayat.odisha.gov.in/', category: 'Odisha', department: 'Rural Development' },
  { id: 'od-rural-dev', name: 'Odisha Department of Rural Development Office', url: 'https://rd.odisha.gov.in/', category: 'Odisha', department: 'Rural Development' },
  { id: 'od-nrega', name: 'MGNREGA Odisha Job Card Information System', url: 'https://nrega.odisha.gov.in/', category: 'Odisha', department: 'Rural Development' },

  // Revenue & Lands
  { id: 'od-revenue', name: 'Odisha Revenue & Disaster Management Department', url: 'https://revenue.odisha.gov.in/', category: 'Odisha', department: 'Revenue & Land Records' },
  { id: 'od-land-records', name: 'Odisha Bhulekh Online Land Records Portal', url: 'https://bhulekh.odisha.gov.in/', category: 'Odisha', department: 'Revenue & Land Records' },
  { id: 'od-registration', name: 'Odisha Inspector General of Registration (IGR)', url: 'https://registration.odisha.gov.in/', category: 'Odisha', department: 'Revenue & Land Records' },
  { id: 'od-revenue-board', name: 'Odisha State Board of Revenue Administration', url: 'https://revenue.odisha.gov.in/', category: 'Odisha', department: 'Revenue & Land Records' },
  { id: 'od-milaap', name: 'Odisha Milaap Land Consolidation & Records', url: 'https://milaap.odisha.gov.in/', category: 'Odisha', department: 'Revenue & Land Records' },

  // Housing & Urban
  { id: 'od-housing', name: 'Odisha Housing & Urban Development Department', url: 'https://housing.odisha.gov.in/', category: 'Odisha', department: 'Housing & Urban Development' },
  { id: 'od-municipal', name: 'Odisha Municipal Administration Services Hub', url: 'https://municipal.odisha.gov.in/', category: 'Odisha', department: 'Housing & Urban Development' },
  { id: 'od-urban-dev', name: 'Odisha Urban Development & Land Authority', url: 'https://udd.odisha.gov.in/', category: 'Odisha', department: 'Housing & Urban Development' },

  // Finance & Taxes
  { id: 'od-finance', name: 'Odisha State Department of Finance', url: 'https://finance.odisha.gov.in/', category: 'Odisha', department: 'Administration' },
  { id: 'od-commercial-tax', name: 'Odisha Commercial Taxes and GST Division', url: 'https://tax.odisha.gov.in/', category: 'Odisha', department: 'Administration' },
  { id: 'od-excise', name: 'Odisha State Excise Department Console', url: 'https://excise.odisha.gov.in/', category: 'Odisha', department: 'Administration' },

  // Welfare Schemes
  { id: 'od-scst-welfare', name: 'Odisha SC & ST Development Department', url: 'https://stwelfare.odisha.gov.in/', category: 'Odisha', department: 'Welfare Schemes' },
  { id: 'od-bc-welfare', name: 'Odisha Backward Classes Welfare Commission', url: 'https://bcwelfare.odisha.gov.in/', category: 'Odisha', department: 'Welfare Schemes' },
  { id: 'od-minority-welfare', name: 'Odisha Minorities & Backward Classes Dev', url: 'https://minority.odisha.gov.in/', category: 'Odisha', department: 'Welfare Schemes' },
  { id: 'od-wcd', name: 'Odisha Women and Child Development (WCD)', url: 'https://wcd.odisha.gov.in/', category: 'Odisha', department: 'Welfare Schemes' },
  { id: 'od-social-justice', name: 'Odisha Social Security & Empowerment (SSEPD)', url: 'https://socialjustice.odisha.gov.in/', category: 'Odisha', department: 'Welfare Schemes' },
  { id: 'od-disability', name: 'Odisha Differently Abled Persons Welfare Desk', url: 'https://disability.odisha.gov.in/', category: 'Odisha', department: 'Welfare Schemes' },
  { id: 'od-tribal', name: 'Odisha Scheduled Tribe Development Council', url: 'https://tribal.odisha.gov.in/', category: 'Odisha', department: 'Welfare Schemes' },

  // Education Higher
  { id: 'od-higher-education', name: 'Odisha Higher Education Department Office', url: 'https://he.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-technical-education', name: 'Odisha Directorate of Technical Education', url: 'https://dte.odisha.gov.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-school-board', name: 'Board of Secondary Education (BSE Odisha)', url: 'https://bseodisha.ac.in/', category: 'Odisha', department: 'Education Department' },
  { id: 'od-university', name: 'Utkal University Main Campus Bhubaneswar', url: 'https://ouofbbsr.ac.in/', category: 'Odisha', department: 'Education Department' },

  // Legal
  { id: 'od-high-court', name: 'Odisha High Court Judicial Recruitment Office', url: 'https://odishahighcourt.gov.in/', category: 'Odisha', department: 'Government Gazettes' },
  { id: 'od-acb', name: 'Odisha Anti-Corruption Vigilance Bureau', url: 'https://acb.odisha.gov.in/', category: 'Odisha', department: 'Administration' },

  // E-Services
  { id: 'od-edistrict', name: 'Odisha e-District Portal Citizen Service', url: 'https://edistrict.odisha.gov.in/', category: 'Odisha', department: 'E-Services' },
  { id: 'od-online-services', name: 'Odisha Unified State Services Desk (Odisha.gov)', url: 'https://odisha.gov.in/services', category: 'Odisha', department: 'E-Services' },
  { id: 'od-seva', name: 'Odisha Seva Citizen Services Delivery Gateway', url: 'https://seva.odisha.gov.in/', category: 'Odisha', department: 'E-Services' },

  // Other Portals
  { id: 'od-tourism', name: 'Odisha Tourism Development Corporation (OTDC)', url: 'https://odishatourism.gov.in/', category: 'Odisha', department: 'Tourism & Culture' },
  { id: 'od-skill-dev', name: 'Skill Development & Technical Education', url: 'https://skillodisha.gov.in/', category: 'Odisha', department: 'Employment Services' },
  { id: 'od-sjis-jobs', name: 'Odisha State Skill & Job Intake Portal (SJIS)', url: 'https://jobs.skillodisha.gov.in/', category: 'Odisha', department: 'Employment Services' },
  { id: 'od-youth', name: 'Odisha Youth Welfare and Sports Affairs', url: 'https://youth.odisha.gov.in/', category: 'Odisha', department: 'Tourism & Culture' },
  { id: 'od-sports', name: 'Odisha Sports and Youth Services Department', url: 'https://sports.odisha.gov.in/', category: 'Odisha', department: 'Tourism & Culture' },
  { id: 'od-industries', name: 'Odisha Industrial Development Corporation IDCO', url: 'https://industries.odisha.gov.in/', category: 'Odisha', department: 'Industries & IT' },
  { id: 'od-msme', name: 'Odisha MSME Development Commission Unit', url: 'https://msme.odisha.gov.in/', category: 'Odisha', department: 'Employment Services' },
  { id: 'od-cooperative', name: 'Odisha Registrar of Cooperative Societies', url: 'https://cooperation.odisha.gov.in/', category: 'Odisha', department: 'Administrative Units' },
  { id: 'od-food', name: 'Odisha Food Supplies & Consumer Welfare Desk', url: 'https://food.odisha.gov.in/', category: 'Odisha', department: 'Administration' },

  // --- PUNJAB GOVERNMENT WEBSITES ---
  // Main State Portals & Info
  { id: 'pb-portal', name: 'Punjab State Government Portal (Official)', url: 'https://punjab.gov.in/', category: 'Punjab', department: 'Main State Portal' },
  { id: 'pb-cmo', name: 'Punjab Chief Minister Office (CMO)', url: 'https://cmo.punjab.gov.in/', category: 'Punjab', department: 'Administration' },
  { id: 'pb-cmo-releases', name: 'Punjab CM Press Releases Desk', url: 'https://cmo.punjab.gov.in/press', category: 'Punjab', department: 'Administration' },
  { id: 'pb-latest-news', name: 'Punjab State Latest News Desk', url: 'https://punjab.gov.in/news', category: 'Punjab', department: 'Administration' },
  { id: 'pb-services-eserv', name: 'eServices Punjab Unified Citizen Intake', url: 'https://eservices.punjab.gov.in/', category: 'Punjab', department: 'E-Services' },

  // PPSC
  { id: 'pb-psc', name: 'Punjab Public Service Commission (PPSC)', url: 'https://ppsc.gov.in/', category: 'Punjab', department: 'Recruitment Board' },
  { id: 'pb-psc-results', name: 'PPSC Competitive Exam Results Desk', url: 'https://ppsc.gov.in/results', category: 'Punjab', department: 'Recruitment Board' },
  { id: 'pb-psc-calendar', name: 'PPSC Recruitment Official Exam Calendar', url: 'https://ppsc.gov.in/exam-calendar', category: 'Punjab', department: 'Recruitment Board' },

  // Police & Fire
  { id: 'pb-police-main', name: 'Punjab State Police Headquarters Portal', url: 'https://punjabpolice.gov.in/', category: 'Punjab', department: 'Police & Security' },
  { id: 'pb-police', name: 'Punjab Police Official Recruitment Cell (En/Rec)', url: 'https://punjabpolice.gov.in/en/recruitment', category: 'Punjab', department: 'Police & Security' },
  { id: 'pb-police-constable', name: 'Punjab Police Constable Active Careers', url: 'https://punjabpolice.gov.in/en/recruitment', category: 'Punjab', department: 'Police & Security' },
  { id: 'pb-police-si', name: 'Punjab Police Sub-Inspector Job Openings', url: 'https://punjabpolice.gov.in/en/recruitment', category: 'Punjab', department: 'Police & Security' },
  { id: 'pb-fire-force', name: 'Punjab State Fire Force Unit Portal', url: 'https://fire.punjab.gov.in/', category: 'Punjab', department: 'Police & Security' },

  // Teachers / Education Recruitment
  { id: 'pb-education', name: 'Punjab School Education Department Portal', url: 'https://education.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-teachers', name: 'Punjab Teacher Eligibility Test Board (TET)', url: 'https://punjabtet.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-trb', name: 'Punjab Teacher Recruitment Board Office', url: 'https://education.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-pgt-tgt', name: 'Punjab PGT/TGT Teacher Deployment Console', url: 'https://education.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-school-teachers', name: 'Punjab School Teachers District Allocation', url: 'https://education.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-secondary-board', name: 'Punjab School Education Board Academic (PSEB)', url: 'https://bseply.edu.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-bed', name: 'Punjab Professional B.Ed Admissions Cell', url: 'https://dte.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },

  // Health
  { id: 'pb-health', name: 'Punjab Health & Family Welfare Department', url: 'https://health.punjab.gov.in/', category: 'Punjab', department: 'Health Department' },
  { id: 'pb-health-medical', name: 'Punjab Directorate of Health Services Office', url: 'https://healthservices.punjab.gov.in/', category: 'Punjab', department: 'Health Department' },
  { id: 'pb-health-nursing', name: 'Punjab Nursing Training and Registration Council', url: 'https://nursing.punjab.gov.in/', category: 'Punjab', department: 'Health Department' },
  { id: 'pb-health-ayush', name: 'Punjab State AYUSH Education Systems', url: 'https://ayush.punjab.gov.in/', category: 'Punjab', department: 'Health Department' },
  { id: 'pb-health-med-edu', name: 'Punjab Directorate of Medical Education (DRME)', url: 'https://medicaleducation.punjab.gov.in/', category: 'Punjab', department: 'Health Department' },

  // Agriculture & Forest
  { id: 'pb-agri', name: 'Punjab Department of Agriculture Development', url: 'https://agriculture.punjab.gov.in/', category: 'Punjab', department: 'Agriculture Department' },
  { id: 'pb-horticulture', name: 'Punjab Directorate of Horticulture Board', url: 'https://horticulture.punjab.gov.in/', category: 'Punjab', department: 'Agriculture Department' },
  { id: 'pb-forest', name: 'Punjab Forest, Ecology & Wildlife Agency', url: 'https://forest.punjab.gov.in/', category: 'Punjab', department: 'Forest & Environment' },
  { id: 'pb-animal-husbandry', name: 'Punjab Animal Husbandry Commission Unit', url: 'https://ah.punjab.gov.in/', category: 'Punjab', department: 'Agriculture Department' },
  { id: 'pb-fisheries', name: 'Punjab Fisheries Development Corporation', url: 'https://fisheries.punjab.gov.in/', category: 'Punjab', department: 'Agriculture Department' },

  // Transport
  { id: 'pb-transport', name: 'Punjab Transport & Vehicle Management', url: 'https://transport.punjab.gov.in/', category: 'Punjab', department: 'Transport & Infrastructure' },
  { id: 'pb-stc', name: 'Punjab State Transmission Corporation (PSTC)', url: 'https://pstc.punjab.gov.in/', category: 'Punjab', department: 'Transport & Infrastructure' },

  // Power
  { id: 'pb-power', name: 'Punjab State Power Corporation Limited Portal', url: 'https://power.punjab.gov.in/', category: 'Punjab', department: 'Power Sector' },
  { id: 'pb-vidyut', name: 'Punjab Vidyut Generation & Transverse Hub', url: 'https://punjabpower.com/', category: 'Punjab', department: 'Power Sector' },

  // Panchayat / Rural Dev
  { id: 'pb-panchayat', name: 'Punjab Panchayat Raj & Rural Dev Office', url: 'https://panchayat.punjab.gov.in/', category: 'Punjab', department: 'Rural Development' },
  { id: 'pb-rural-dev', name: 'Punjab Unified Rural Development Councils', url: 'https://rd.punjab.gov.in/', category: 'Punjab', department: 'Rural Development' },
  { id: 'pb-nrega', name: 'MGNREGA Punjab Labor & Job Card Information', url: 'https://nrega.punjab.gov.in/', category: 'Punjab', department: 'Rural Development' },

  // Revenue & Land
  { id: 'pb-revenue', name: 'Punjab Revenue & Rehabilitation Department', url: 'https://revenue.punjab.gov.in/', category: 'Punjab', department: 'Revenue & Land Records' },
  { id: 'pb-land-records', name: 'Punjab Jamabandi Online Lands Record Portal', url: 'https://jamabandi.punjab.gov.in/', category: 'Punjab', department: 'Revenue & Land Records' },
  { id: 'pb-registration', name: 'Punjab Stamp Inspector of Registration', url: 'https://registration.punjab.gov.in/', category: 'Punjab', department: 'Revenue & Land Records' },

  // Housing & Urban
  { id: 'pb-housing', name: 'Punjab State Housing & Urban Development Office', url: 'https://housing.punjab.gov.in/', category: 'Punjab', department: 'Housing & Urban Development' },
  { id: 'pb-municipal', name: 'Punjab Municipal Governance & Work Service', url: 'https://municipal.punjab.gov.in/', category: 'Punjab', department: 'Housing & Urban Development' },
  { id: 'pb-urban-dev', name: 'Punjab Urban Development Authority (PUDA)', url: 'https://udd.punjab.gov.in/', category: 'Punjab', department: 'Housing & Urban Development' },

  // Finance & Taxes
  { id: 'pb-finance', name: 'Punjab State Treasury & Finance Department', url: 'https://finance.punjab.gov.in/', category: 'Punjab', department: 'Administration' },
  { id: 'pb-commercial-tax', name: 'Punjab Excise Commerce Taxes and GST', url: 'https://tax.punjab.gov.in/', category: 'Punjab', department: 'Administration' },
  { id: 'pb-excise', name: 'Punjab State Prohibition and Excise Directorate', url: 'https://excise.punjab.gov.in/', category: 'Punjab', department: 'Administration' },

  // Welfare Schemes
  { id: 'pb-scst-welfare', name: 'Punjab Schedule Castes & Tribe Welfare Office', url: 'https://stwelfare.punjab.gov.in/', category: 'Punjab', department: 'Welfare Schemes' },
  { id: 'pb-bc-welfare', name: 'Punjab Backward Classes Welfare Division', url: 'https://bcwelfare.punjab.gov.in/', category: 'Punjab', department: 'Welfare Schemes' },
  { id: 'pb-minority-welfare', name: 'Punjab Minority Development Department', url: 'https://minority.punjab.gov.in/', category: 'Punjab', department: 'Welfare Schemes' },
  { id: 'pb-wcd', name: 'Punjab Women and Children Development (WCD)', url: 'https://wcd.punjab.gov.in/', category: 'Punjab', department: 'Welfare Schemes' },
  { id: 'pb-social-justice', name: 'Punjab Social Security & Empowerment Board', url: 'https://socialjustice.punjab.gov.in/', category: 'Punjab', department: 'Welfare Schemes' },

  // Education Higher/Technical
  { id: 'pb-higher-education', name: 'Punjab Higher Education Commission Unit', url: 'https://he.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-technical-education', name: 'Punjab Directorate of Technical Education', url: 'https://dte.punjab.gov.in/', category: 'Punjab', department: 'Education Department' },
  { id: 'pb-board', name: 'Punjab Board of School Education (PSEB Council)', url: 'https://bseply.edu.in/', category: 'Punjab', department: 'Education Department' },

  // Legal
  { id: 'pb-high-court', name: 'Punjab portion of High Court Judicial Careers', url: 'https://chandigarhhighcourt.gov.in/', category: 'Punjab', department: 'Government Gazettes' },

  // E-Services
  { id: 'pb-eservices', name: 'Punjab eServices Unified Official Portal', url: 'https://eservices.punjab.gov.in/', category: 'Punjab', department: 'E-Services' },
  { id: 'pb-online-services', name: 'Punjab Unified Digital Services Platform', url: 'https://punjab.gov.in/services', category: 'Punjab', department: 'E-Services' },

  // Other Portals
  { id: 'pb-tourism', name: 'Punjab Tourism Development Corp Office (PTDC)', url: 'https://tourism.punjab.gov.in/', category: 'Punjab', department: 'Tourism & Culture' },
  { id: 'pb-skill-dev', name: 'Punjab Skill Development Mission Office', url: 'https://skil.punjab.gov.in/', category: 'Punjab', department: 'Employment Services' },
  { id: 'pb-youth', name: 'Punjab Directorate of Sports and Youth Services', url: 'https://youth.punjab.gov.in/', category: 'Punjab', department: 'Tourism & Culture' },
  { id: 'pb-sports', name: 'Punjab Sports Council Administration', url: 'https://sports.punjab.gov.in/', category: 'Punjab', department: 'Tourism & Culture' },
  { id: 'pb-industries', name: 'Punjab Industrial Development Corporation Unit', url: 'https://industries.punjab.gov.in/', category: 'Punjab', department: 'Industries & IT' },
  { id: 'pb-msme', name: 'Punjab MSME Business Incubation Program Desk', url: 'https://msme.punjab.gov.in/', category: 'Punjab', department: 'Employment Services' },


  // --- HARYANA GOVERNMENT WEBSITES ---
  // Main State Portals & Info
  { id: 'hr-portal', name: 'Haryana State Government Portal (Official)', url: 'https://www.haryana.gov.in/', category: 'Haryana', department: 'Main State Portal' },
  { id: 'hr-cmo', name: 'Haryana Chief Minister Office (CMO)', url: 'https://cmo.haryana.gov.in/', category: 'Haryana', department: 'Administration' },
  { id: 'hr-cmo-releases', name: 'Haryana CM Press Releases Desk', url: 'https://cmo.haryana.gov.in/press-releases', category: 'Haryana', department: 'Administration' },
  { id: 'hr-latest-news', name: 'Haryana Government Latest News Portal', url: 'https://www.haryana.gov.in/news', category: 'Haryana', department: 'Administration' },
  { id: 'hr-saral', name: 'Saral Haryana Single Window Citizen Service', url: 'https://saral.haryana.gov.in/', category: 'Haryana', department: 'E-Services' },
  { id: 'hr-intra', name: 'Intra Haryana Government Internal Console', url: 'https://intrahry.gov.in/', category: 'Haryana', department: 'E-Services' },

  // HPPSC
  { id: 'hr-psc', name: 'Haryana Public Service Commission (HPPSC)', url: 'https://hppsc.haryana.gov.in/', category: 'Haryana', department: 'Recruitment Board' },
  { id: 'hr-psc-results', name: 'HPPSC Exam Merit Lists & Selection Desk', url: 'https://hppsc.haryana.gov.in/results', category: 'Haryana', department: 'Recruitment Board' },
  { id: 'hr-psc-calendar', name: 'HPPSC Recruitment Official Exam Calendar', url: 'https://hppsc.haryana.gov.in/exam-calendar', category: 'Haryana', department: 'Recruitment Board' },

  // HSSC
  { id: 'hr-ssc', name: 'Haryana Staff Selection Commission (HSSC)', url: 'https://hssc.haryana.gov.in/', category: 'Haryana', department: 'Recruitment Board' },
  { id: 'hr-ssc-results', name: 'HSSC Competitive Selection Final Results', url: 'https://hssc.haryana.gov.in/results', category: 'Haryana', department: 'Recruitment Board' },
  { id: 'hr-ssc-app', name: 'HSSC Online Application Direct Intake', url: 'https://hssc.haryana.gov.in/application', category: 'Haryana', department: 'Recruitment Board' },

  // Police & Fire
  { id: 'hr-police-main', name: 'Haryana State Police Headquarters Portal', url: 'https://haryanapolice.gov.in/', category: 'Haryana', department: 'Police & Security' },
  { id: 'hr-police', name: 'Haryana Police Official Recruitment Bureau', url: 'https://haryanapolice.gov.in/en/recruitment', category: 'Haryana', department: 'Police & Security' },
  { id: 'hr-police-constable', name: 'Haryana Police Constable Service Openings', url: 'https://haryanapolice.gov.in/en/recruitment', category: 'Haryana', department: 'Police & Security' },
  { id: 'hr-police-si', name: 'Haryana Police Sub-Inspector Open Careers', url: 'https://haryanapolice.gov.in/en/recruitment', category: 'Haryana', department: 'Police & Security' },
  { id: 'hr-fire-force', name: 'Haryana Fire Service and Emergency Board', url: 'https://firehry.gov.in/', category: 'Haryana', department: 'Police & Security' },

  // Teachers / Education Recruitment
  { id: 'hr-education', name: 'Haryana School Education Department System', url: 'https://educationhry.nic.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-teachers', name: 'Haryana Teacher Eligibility Test Board (HTET)', url: 'https://haryanatet.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-trb', name: 'Haryana Teacher Recruitment Board Core Desk', url: 'https://educationhry.nic.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-pgt-tgt', name: 'Haryana PGT/TGT Teacher Deployment System', url: 'https://educationhry.nic.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-school-teachers', name: 'Haryana School Teachers District Allotment', url: 'https://educationhry.nic.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-secondary-board', name: 'Board of School Education Haryana (BSEH)', url: 'https://bseh.org.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-bed', name: 'Haryana Professional B.Ed Admissions Office', url: 'https://dtehry.nic.in/', category: 'Haryana', department: 'Education Department' },

  // Health
  { id: 'hr-health', name: 'Haryana Health Department (Official Board)', url: 'https://haryanahealth.gov.in/', category: 'Haryana', department: 'Health Department' },
  { id: 'hr-health-medical', name: 'Haryana Directorate of Health Services Office', url: 'https://healthserviceshry.nic.in/', category: 'Haryana', department: 'Health Department' },
  { id: 'hr-health-nursing', name: 'Haryana Nurses and Nurse Midwives Council', url: 'https://nursinghry.nic.in/', category: 'Haryana', department: 'Health Department' },
  { id: 'hr-health-ayush', name: 'Haryana State Directorate of AYUSH Systems', url: 'https://ayushhry.nic.in/', category: 'Haryana', department: 'Health Department' },
  { id: 'hr-health-med-edu', name: 'Haryana Directorate of Medical Education Services', url: 'https://medicaleducationhry.nic.in/', category: 'Haryana', department: 'Health Department' },

  // Agriculture & Forest
  { id: 'hr-agri', name: 'Haryana Agriculture & Farmers Welfare Unit', url: 'https://agriculturehry.nic.in/', category: 'Haryana', department: 'Agriculture Department' },
  { id: 'hr-horticulture', name: 'Haryana Directorate of Horticulture Portal', url: 'https://horticulturehry.nic.in/', category: 'Haryana', department: 'Agriculture Department' },
  { id: 'hr-forest', name: 'Haryana Environment, Forest & Climate Office', url: 'https://foresthry.nic.in/', category: 'Haryana', department: 'Forest & Environment' },
  { id: 'hr-animal-husbandry', name: 'Haryana Animal Husbandry & Dairying Unit', url: 'https://ahhry.nic.in/', category: 'Haryana', department: 'Agriculture Department' },
  { id: 'hr-fisheries', name: 'Haryana State Fisheries Development Agency', url: 'https://fisherieshry.nic.in/', category: 'Haryana', department: 'Agriculture Department' },

  // Transport
  { id: 'hr-transport', name: 'Haryana Transport and State Vehicles Division', url: 'https://transporthry.nic.in/', category: 'Haryana', department: 'Transport & Infrastructure' },
  { id: 'hr-stc', name: 'Haryana State Transmission Corp (HSTC)', url: 'https://hstc.hry.nic.in/', category: 'Haryana', department: 'Transport & Infrastructure' },

  // Power
  { id: 'hr-power', name: 'Haryana Department of Power & Electricity', url: 'https://powerhry.nic.in/', category: 'Haryana', department: 'Power Sector' },
  { id: 'hr-hvpnl', name: 'Haryana Vidyut Prasaran Nigam Limited (HVPNL)', url: 'https://hvpnl.com/', category: 'Haryana', department: 'Power Sector' },
  { id: 'hr-vidyut', name: 'Haryana Urja Vidyut Distribution & Grid', url: 'https://haryanapower.com/', category: 'Haryana', department: 'Power Sector' },

  // Panchayat / Rural Dev
  { id: 'hr-panchayat', name: 'Haryana Panchayat Raj & Rural Dev Council', url: 'https://panchayathry.nic.in/', category: 'Haryana', department: 'Rural Development' },
  { id: 'hr-rural-dev', name: 'Haryana Department of Rural Development Board', url: 'https://rdhry.nic.in/', category: 'Haryana', department: 'Rural Development' },
  { id: 'hr-nrega', name: 'MGNREGA Haryana Employment & Job Card Console', url: 'https://nhry.nic.in/', category: 'Haryana', department: 'Rural Development' },

  // Revenue & Lands
  { id: 'hr-revenue', name: 'Haryana Revenue & Disaster Management Office', url: 'https://revenuehry.nic.in/', category: 'Haryana', department: 'Revenue & Land Records' },
  { id: 'hr-land-records', name: 'Haryana Jamabandi Online Record of Land Rights', url: 'https://jamabandi.nic.in/', category: 'Haryana', department: 'Revenue & Land Records' },
  { id: 'hr-registration', name: 'Haryana Stamps and Registration Services Office', url: 'https://registrationhry.nic.in/', category: 'Haryana', department: 'Revenue & Land Records' },

  // Housing & Urban
  { id: 'hr-housing', name: 'Haryana Housing Board and Welfare Department', url: 'https://housinghry.nic.in/', category: 'Haryana', department: 'Housing & Urban Development' },
  { id: 'hr-municipal', name: 'Haryana Municipal Administration Council Portal', url: 'https://municipalhry.nic.in/', category: 'Haryana', department: 'Housing & Urban Development' },
  { id: 'hr-urban-dev', name: 'Haryana Urban Local Bodies Services (ULB)', url: 'https://uddhry.nic.in/', category: 'Haryana', department: 'Housing & Urban Development' },

  // Finance & Taxes
  { id: 'hr-finance', name: 'Haryana State Finance Department Office', url: 'https://financehry.nic.in/', category: 'Haryana', department: 'Administration' },
  { id: 'hr-commercial-tax', name: 'Haryana Excise, Commercial Tax and GST', url: 'https://taxhry.nic.in/', category: 'Haryana', department: 'Administration' },
  { id: 'hr-excise', name: 'Haryana State Prohibition & Excise Division', url: 'https://excisehry.nic.in/', category: 'Haryana', department: 'Administration' },

  // Welfare Schemes
  { id: 'hr-scst-welfare', name: 'Haryana Schedule Castes & Tribe Integration', url: 'https://stwelfarehry.nic.in/', category: 'Haryana', department: 'Welfare Schemes' },
  { id: 'hr-bc-welfare', name: 'Haryana Welfare of Backward Classes Unit', url: 'https://bcwelfarehry.nic.in/', category: 'Haryana', department: 'Welfare Schemes' },
  { id: 'hr-minority-welfare', name: 'Haryana Minorities Welfare Board Office', url: 'https://minorityhry.nic.in/', category: 'Haryana', department: 'Welfare Schemes' },
  { id: 'hr-wcd', name: 'Haryana Women and Child Development (WCD)', url: 'https://wcdhry.nic.in/', category: 'Haryana', department: 'Welfare Schemes' },
  { id: 'hr-social-justice', name: 'Haryana Social Justice, Welfare & Disability', url: 'https://socialjusticehry.nic.in/', category: 'Haryana', department: 'Welfare Schemes' },

  // Higher Ed
  { id: 'hr-higher-education', name: 'Haryana Higher Education Department (Official)', url: 'https://highereduhry.ac.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-technical-education', name: 'Haryana Directorate of Technical Education', url: 'https://dtehry.nic.in/', category: 'Haryana', department: 'Education Department' },
  { id: 'hr-board', name: 'Board of School Education Haryana Sector BSEH', url: 'https://bseh.org.in/', category: 'Haryana', department: 'Education Department' },

  // Legal
  { id: 'hr-high-court', name: 'Haryana portion of High Court Judicial Careers', url: 'https://chandigarhhighcourt.gov.in/', category: 'Haryana', department: 'Government Gazettes' },

  // E-Services
  { id: 'hr-saral-service', name: 'Saral Haryana Unified Citizen Service Hub', url: 'https://saral.haryana.gov.in/', category: 'Haryana', department: 'E-Services' },
  { id: 'hr-intra-portal', name: 'Intra Haryana Government Internal Systems', url: 'https://intrahry.gov.in/', category: 'Haryana', department: 'E-Services' },
  { id: 'hr-edistrict', name: 'Haryana e-District Administration Platform', url: 'https://edistricthry.nic.in/', category: 'Haryana', department: 'E-Services' },

  // Other Portals
  { id: 'hr-tourism', name: 'Haryana Tourism Development Corporation (HTDC)', url: 'https://tourismhry.nic.in/', category: 'Haryana', department: 'Tourism & Culture' },
  { id: 'hr-skill-dev', name: 'Paschim Banga Haryana Skill Development Board', url: 'https://skilhry.nic.in/', category: 'Haryana', department: 'Employment Services' },
  { id: 'hr-youth', name: 'Haryana Youth Affairs Directorate Portal', url: 'https://youthhry.nic.in/', category: 'Haryana', department: 'Tourism & Culture' },
  { id: 'hr-sports', name: 'Haryana Sports and Youth Affairs Department', url: 'https://sportshry.nic.in/', category: 'Haryana', department: 'Tourism & Culture' },
  { id: 'hr-industries', name: 'Haryana Directorate of Industries & Commerce', url: 'https://industrieshry.nic.in/', category: 'Haryana', department: 'Industries & IT' },
  { id: 'hr-msme', name: 'Haryana MSME Business Incubation Program Desk', url: 'https://msmehry.nic.in/', category: 'Haryana', department: 'Employment Services' },

  // --- JHARKHAND GOVERNMENT WEBSITES ---
  { id: 'jh-portal', name: 'Jharkhand State Government Portal', url: 'https://jharkhand.gov.in/', category: 'Jharkhand', department: 'Main State Portal' },
  { id: 'jh-cmo', name: 'Jharkhand Chief Minister Office (CMO)', url: 'https://cmo.jharkhand.gov.in/', category: 'Jharkhand', department: 'Administration' },
  { id: 'jh-nic', name: 'NIC Jharkhand Services Portal', url: 'https://jh.nic.in/', category: 'Jharkhand', department: 'E-Governance & NIC' },
  { id: 'jh-psc', name: 'Jharkhand Public Service Commission (JPSC)', url: 'https://jrpsc.jharkhand.gov.in/', category: 'Jharkhand', department: 'Recruitment Board' },
  { id: 'jh-ssc', name: 'Jharkhand Staff Selection Commission (JSSC)', url: 'https://jssc.jharkhand.gov.in/', category: 'Jharkhand', department: 'Recruitment Board' },
  { id: 'jh-police', name: 'Jharkhand State Police Force', url: 'https://www.jhpolice.gov.in/', category: 'Jharkhand', department: 'Police & Security' },
  { id: 'jh-police-rec', name: 'Jharkhand Police Recruitment Portal', url: 'https://www.jhpolice.gov.in/en/recruitment', category: 'Jharkhand', department: 'Police & Security' },
  { id: 'jh-teachers', name: 'Jharkhand School Education Department', url: 'https://education.jharkhand.gov.in/', category: 'Jharkhand', department: 'Education Department' },
  { id: 'jh-tet', name: 'Jharkhand Teacher Eligibility Test Portal', url: 'https://jhset.jharkhand.gov.in/', category: 'Jharkhand', department: 'Education Department' },
  { id: 'jh-health', name: 'Jharkhand Health & Family Welfare Department', url: 'https://health.jharkhand.gov.in/', category: 'Jharkhand', department: 'Health Department' },
  { id: 'jh-medical', name: 'Jharkhand Medical Services', url: 'https://healthservices.jharkhand.gov.in/', category: 'Jharkhand', department: 'Health Department' },
  { id: 'jh-agri', name: 'Jharkhand Agriculture Directorate', url: 'https://agriculture.jharkhand.gov.in/', category: 'Jharkhand', department: 'Agriculture Department' },
  { id: 'jh-forest', name: 'Jharkhand Forest & Environment Division', url: 'https://forest.jharkhand.gov.in/', category: 'Jharkhand', department: 'Environment & Forest' },
  { id: 'jh-panchayat', name: 'Jharkhand Panchayat State Division', url: 'https://pr.jharkhand.gov.in/', category: 'Jharkhand', department: 'Panchayat & Rural Development' },
  { id: 'jh-revenue', name: 'Jharkhand Revenue & Land Reforms', url: 'https://revenue.jharkhand.gov.in/', category: 'Jharkhand', department: 'Revenue & Land Records' },
  { id: 'jh-land', name: 'Jharkhand Bhulekh Land Records', url: 'https://bhulekh.jharkhand.gov.in/', category: 'Jharkhand', department: 'Revenue & Land Records' },
  { id: 'jh-housing', name: 'Jharkhand Housing & Urban Development', url: 'https://housing.jharkhand.gov.in/', category: 'Jharkhand', department: 'Housing & Urban Development' },
  { id: 'jh-finance', name: 'Jharkhand State Finance Department', url: 'https://finance.jharkhand.gov.in/', category: 'Jharkhand', department: 'Finance & Treasury' },
  { id: 'jh-welfare', name: 'Jharkhand SC / ST Welfare Ministry', url: 'https://stwelfare.jharkhand.gov.in/', category: 'Jharkhand', department: 'Welfare & Social Justice' },
  { id: 'jh-wcd', name: 'Jharkhand Women & Child Development', url: 'https://wcd.jharkhand.gov.in/', category: 'Jharkhand', department: 'Welfare & Social Justice' },
  { id: 'jh-higher-edu', name: 'Jharkhand Higher Educational Council', url: 'https://he.jharkhand.gov.in/', category: 'Jharkhand', department: 'Education Department' },
  { id: 'jh-tech-edu', name: 'Jharkhand Directorate of Technical Education', url: 'https://dte.jharkhand.gov.in/', category: 'Jharkhand', department: 'Education Department' },
  { id: 'jh-high-court', name: 'Jharkhand High Court Administration', url: 'https://jharkhandhighcourt.nic.in/', category: 'Jharkhand', department: 'Judiciary & Legal' },
  { id: 'jh-edistrict', name: 'Jharkhand State e-District Portal', url: 'https://edistrict.jharkhand.gov.in/', category: 'Jharkhand', department: 'E-Services' },
  { id: 'jh-tourism', name: 'Jharkhand State Tourism Department', url: 'https://tourism.jharkhand.gov.in/', category: 'Jharkhand', department: 'Tourism & Culture' },
  { id: 'jh-skill', name: 'Jharkhand Skill Development Mission', url: 'https://skil.jharkhand.gov.in/', category: 'Jharkhand', department: 'Employment Services' },
  { id: 'jh-industries', name: 'Jharkhand Directorate of Industries', url: 'https://industries.jharkhand.gov.in/', category: 'Jharkhand', department: 'Industries & IT' },
  { id: 'jh-japit', name: 'JAP-IT Recruitment Board Desk', url: 'https://recruitment.jharkhand.gov.in/', category: 'Jharkhand', department: 'Recruitment Board' },

  // --- ASSAM GOVERNMENT WEBSITES ---
  { id: 'as-portal', name: 'Assam State Government Portal', url: 'https://assam.gov.in/', category: 'Assam', department: 'Main State Portal' },
  { id: 'as-cmo', name: 'Assam Chief Minister Office (CMO)', url: 'https://cmo.assam.gov.in/', category: 'Assam', department: 'Administration' },
  { id: 'as-nic', name: 'NIC Assam State Center Portal', url: 'https://assam.nic.in/', category: 'Assam', department: 'E-Governance & NIC' },
  { id: 'as-psc', name: 'Assam Public Service Commission (APSC)', url: 'https://apsc.in/', category: 'Assam', department: 'Recruitment Board' },
  { id: 'as-police', name: 'Assam Police Department HQ', url: 'https://police.assam.gov.in/', category: 'Assam', department: 'Police & Security' },
  { id: 'as-police-rec', name: 'Assam Police Recruitment Division', url: 'https://police.assam.gov.in/en/recruitment', category: 'Assam', department: 'Police & Security' },
  { id: 'as-teachers', name: 'Assam School Education Department', url: 'https://education.assam.gov.in/', category: 'Assam', department: 'Education Department' },
  { id: 'as-tet', name: 'Assam Teacher Eligibility Test Portal', url: 'https://assamtet.in/', category: 'Assam', department: 'Education Department' },
  { id: 'as-health', name: 'Assam Health & Family Welfare Ministry', url: 'https://health.assam.gov.in/', category: 'Assam', department: 'Health Department' },
  { id: 'as-medical', name: 'Assam Health Services Directorate', url: 'https://healthservices.assam.gov.in/', category: 'Assam', department: 'Health Department' },
  { id: 'as-agri', name: 'Assam Agriculture Department Board', url: 'https://agriculture.assam.gov.in/', category: 'Assam', department: 'Agriculture Department' },
  { id: 'as-forest', name: 'Assam Forest and Environment Board', url: 'https://forest.assam.gov.in/', category: 'Assam', department: 'Environment & Forest' },
  { id: 'as-panchayat', name: 'Assam Panchayat & Rural State Department', url: 'https://pds.assam.gov.in/', category: 'Assam', department: 'Panchayat & Rural Development' },
  { id: 'as-revenue', name: 'Assam Revenue and Disaster Management', url: 'https://revenue.assam.gov.in/', category: 'Assam', department: 'Revenue & Land Records' },
  { id: 'as-land', name: 'Assam Bhulekh Dharitree Land Records', url: 'https://bhulekh.assam.gov.in/', category: 'Assam', department: 'Revenue & Land Records' },
  { id: 'as-housing', name: 'Assam Housing State Board', url: 'https://housing.assam.gov.in/', category: 'Assam', department: 'Housing & Urban Development' },
  { id: 'as-finance', name: 'Assam Central Finance Department', url: 'https://finance.assam.gov.in/', category: 'Assam', department: 'Finance & Treasury' },
  { id: 'as-welfare', name: 'Assam SC / ST Welfare Department', url: 'https://stwelfare.assam.gov.in/', category: 'Assam', department: 'Welfare & Social Justice' },
  { id: 'as-wcd', name: 'Assam Women & Child Welfare State Directorate', url: 'https://wcd.assam.gov.in/', category: 'Assam', department: 'Welfare & Social Justice' },
  { id: 'as-higher-edu', name: 'Assam Secondary & Higher Educational Council', url: 'https://he.assam.gov.in/', category: 'Assam', department: 'Education Department' },
  { id: 'as-tech-edu', name: 'Assam Directorate of Technical Education', url: 'https://dte.assam.gov.in/', category: 'Assam', department: 'Education Department' },
  { id: 'as-high-court', name: 'Gauhati High Court Legal Portal', url: 'https://gc.nic.in/', category: 'Assam', department: 'Judiciary & Legal' },
  { id: 'as-edistrict', name: 'Assam e-District citizen hub', url: 'https://edistrict.assam.gov.in/', category: 'Assam', department: 'E-Services' },
  { id: 'as-tourism', name: 'Assam State Tourism Development Corporation', url: 'https://assamtourism.gov.in/', category: 'Assam', department: 'Tourism & Culture' },
  { id: 'as-skill', name: 'Assam Skill Development Mission Authority', url: 'https://assamskild.in/', category: 'Assam', department: 'Employment Services' },
  { id: 'as-industries', name: 'Assam Department of Industries & Commerce', url: 'https://industries.assam.gov.in/', category: 'Assam', department: 'Industries & IT' },

  // --- CHHATTISGARH GOVERNMENT WEBSITES ---
  { id: 'cg-portal', name: 'Chhattisgarh State Government Portal', url: 'https://cgstate.gov.in/', category: 'Chhattisgarh', department: 'Main State Portal' },
  { id: 'cg-cmo', name: 'Chhattisgarh Chief Minister Office (CMO)', url: 'https://cmo.cg.gov.in/', category: 'Chhattisgarh', department: 'Administration' },
  { id: 'cg-nic', name: 'NIC Chhattisgarh State Center', url: 'https://cg.nic.in/', category: 'Chhattisgarh', department: 'E-Governance & NIC' },
  { id: 'cg-psc', name: 'Chhattisgarh Public Service Commission (CGPSC)', url: 'https://cgpsc.cg.gov.in/', category: 'Chhattisgarh', department: 'Recruitment Board' },
  { id: 'cg-gbs', name: 'Chhattisgarh Board of Secondary Education (CGBSE)', url: 'https://cgbsebast.cg.gov.in/', category: 'Chhattisgarh', department: 'Education Department' },
  { id: 'cg-police', name: 'Chhattisgarh Bastar Police Security Force', url: 'https://bastarpolice.cg.gov.in/', category: 'Chhattisgarh', department: 'Police & Security' },
  { id: 'cg-police-rec', name: 'Chhattisgarh State Police Recruitment Branch', url: 'https://cgpolice.cg.gov.in/en/recruitment', category: 'Chhattisgarh', department: 'Police & Security' },
  { id: 'cg-education', name: 'Chhattisgarh State Education Portal (School/Edu)', url: 'https://eduportal.cg.nic.in/', category: 'Chhattisgarh', department: 'Education Department' },
  { id: 'cg-tet', name: 'Chhattisgarh Teacher Eligibility Test Dashboard', url: 'https://cgtet.cg.gov.in/', category: 'Chhattisgarh', department: 'Education Department' },
  { id: 'cg-health', name: 'Chhattisgarh Health Department Administration', url: 'https://www.cghealth.nic.in/', category: 'Chhattisgarh', department: 'Health Department' },
  { id: 'cg-medical', name: 'Chhattisgarh Director of Medical Education (CGDME)', url: 'https://cgdme.in/', category: 'Chhattisgarh', department: 'Health Department' },
  { id: 'cg-agri', name: 'Chhattisgarh Directorate of Agriculture', url: 'https://agriportal.cg.nic.in/', category: 'Chhattisgarh', department: 'Agriculture Department' },
  { id: 'cg-horticulture', name: 'Chhattisgarh Horticultural Services Portal', url: 'https://agriportal.cg.nic.in/horticulture/', category: 'Chhattisgarh', department: 'Agriculture Department' },
  { id: 'cg-forest', name: 'Chhattisgarh Forest State Division', url: 'https://fest.cg.gov.in/', category: 'Chhattisgarh', department: 'Environment & Forest' },
  { id: 'cg-husbandry', name: 'Chhattisgarh Animal Husbandry Division', url: 'https://agriportal.cg.nic.in/ahd/ahdEn/default.aspx', category: 'Chhattisgarh', department: 'Agriculture Department' },
  { id: 'cg-panchayat', name: 'Chhattisgarh Panchayat & Rural Development (PRD)', url: 'http://prd.cg.gov.in/', category: 'Chhattisgarh', department: 'Panchayat & Rural Development' },
  { id: 'cg-revenue', name: 'Chhattisgarh Revenue & Land Resources Division', url: 'https://revenue.cg.nic.in/', category: 'Chhattisgarh', department: 'Revenue & Land Records' },
  { id: 'cg-land', name: 'Chhattisgarh Bhulekh Land Records Desk', url: 'https://bhulekh.cg.gov.in/', category: 'Chhattisgarh', department: 'Revenue & Land Records' },
  { id: 'cg-housing', name: 'Chhattisgarh Housing and Urban Development Board', url: 'https://housing.cg.gov.in/', category: 'Chhattisgarh', department: 'Housing & Urban Development' },
  { id: 'cg-finance', name: 'Chhattisgarh Finance & Taxation Department', url: 'https://finance.cg.gov.in/', category: 'Chhattisgarh', department: 'Finance & Treasury' },
  { id: 'cg-welfare', name: 'Chhattisgarh State Tribes & SC/ST Welfare Dept', url: 'https://tribal.cg.gov.in/', category: 'Chhattisgarh', department: 'Welfare & Social Justice' },
  { id: 'cg-wcd', name: 'Chhattisgarh Women & Child Development Directorate', url: 'https://cgwcd.gov.in/', category: 'Chhattisgarh', department: 'Welfare & Social Justice' },
  { id: 'cg-higher-edu', name: 'Chhattisgarh Higher Education Council', url: 'https://highereducation.cg.gov.in/', category: 'Chhattisgarh', department: 'Education Department' },
  { id: 'cg-tech-edu', name: 'Chhattisgarh Directorate of Technical Education', url: 'https://dte.cg.gov.in/', category: 'Chhattisgarh', department: 'Education Department' },
  { id: 'cg-high-court', name: 'Chhattisgarh High Court Administration Portal', url: 'https://chhattisgarhhighcourt.nic.in/', category: 'Chhattisgarh', department: 'Judiciary & Legal' },
  { id: 'cg-edistrict', name: 'Chhattisgarh e-District Administrative Services', url: 'https://edistrict.cg.gov.in/', category: 'Chhattisgarh', department: 'E-Services' },
  { id: 'cg-tourism', name: 'Chhattisgarh Tourism Board Division', url: 'https://tourism.cgstate.gov.in/', category: 'Chhattisgarh', department: 'Tourism & Culture' },
  { id: 'cg-skill', name: 'Chhattisgarh Rojgar & Skill Recruitment Portal', url: 'https://erojgar.cg.gov.in/', category: 'Chhattisgarh', department: 'Employment Services' },
  { id: 'cg-industries', name: 'Chhattisgarh Directorate of Industries & Trade', url: 'https://industries.cg.gov.in/', category: 'Chhattisgarh', department: 'Industries & IT' },

  // --- UTTARAKHAND GOVERNMENT WEBSITES ---
  { id: 'uk-portal', name: 'Uttarakhand State Government Portal', url: 'https://uk.gov.in/', category: 'Uttarakhand', department: 'Main State Portal' },
  { id: 'uk-cmo', name: 'Uttarakhand Chief Minister Office (CMO)', url: 'https://cm.uk.gov.in/', category: 'Uttarakhand', department: 'Administration' },
  { id: 'uk-nic', name: 'NIC Uttarakhand Services Portal', url: 'https://uk.nic.in/', category: 'Uttarakhand', department: 'E-Governance & NIC' },
  { id: 'uk-psc', name: 'Uttarakhand Public Service Commission (UKPSC)', url: 'https://ukpsc.gov.in/', category: 'Uttarakhand', department: 'Recruitment Board' },
  { id: 'uk-police', name: 'Uttarakhand State Police Force HQ', url: 'https://ukpolice.gov.in/', category: 'Uttarakhand', department: 'Police & Security' },
  { id: 'uk-police-rec', name: 'Uttarakhand Police Force Recruitment Desk', url: 'https://ukpolice.gov.in/en/recruitment', category: 'Uttarakhand', department: 'Police & Security' },
  { id: 'uk-teachers', name: 'Uttarakhand School Education Portal', url: 'https://education.uk.gov.in/', category: 'Uttarakhand', department: 'Education Department' },
  { id: 'uk-tet', name: 'Uttarakhand Teacher Eligibility Test Portal', url: 'https://uktet.gov.in/', category: 'Uttarakhand', department: 'Education Department' },
  { id: 'uk-health', name: 'Uttarakhand Health and Family Welfare Directorate', url: 'https://health.uk.gov.in/', category: 'Uttarakhand', department: 'Health Department' },
  { id: 'uk-medical', name: 'Uttarakhand Medical Health Education Services', url: 'https://healthservices.uk.gov.in/', category: 'Uttarakhand', department: 'Health Department' },
  { id: 'uk-agri', name: 'Uttarakhand Director of Agriculture', url: 'https://agriculture.uk.gov.in/', category: 'Uttarakhand', department: 'Agriculture Department' },
  { id: 'uk-forest', name: 'Uttarakhand Forest Protection Department', url: 'https://forest.uk.gov.in/', category: 'Uttarakhand', department: 'Environment & Forest' },
  { id: 'uk-panchayat', name: 'Uttarakhand State Panchayati Raj Department', url: 'https://pdk.uk.gov.in/', category: 'Uttarakhand', department: 'Panchayat & Rural Development' },
  { id: 'uk-revenue', name: 'Uttarakhand Land Revenue Board', url: 'https://revenue.uk.gov.in/', category: 'Uttarakhand', department: 'Revenue & Land Records' },
  { id: 'uk-land', name: 'Uttarakhand Bhulekh Digital Land Records', url: 'https://bhulekh.uk.gov.in/', category: 'Uttarakhand', department: 'Revenue & Land Records' },
  { id: 'uk-housing', name: 'Uttarakhand Housing & Urban Development Board', url: 'https://housing.uk.gov.in/', category: 'Uttarakhand', department: 'Housing & Urban Development' },
  { id: 'uk-finance', name: 'Uttarakhand Finance and Taxation Board', url: 'https://finance.uk.gov.in/', category: 'Uttarakhand', department: 'Finance & Treasury' },
  { id: 'uk-welfare', name: 'Uttarakhand SC/ST/OBC Welfare Directorate', url: 'https://stwelfare.uk.gov.in/', category: 'Uttarakhand', department: 'Welfare & Social Justice' },
  { id: 'uk-wcd', name: 'Uttarakhand Women Empowerment & Child Development', url: 'https://wcd.uk.gov.in/', category: 'Uttarakhand', department: 'Welfare & Social Justice' },
  { id: 'uk-higher-edu', name: 'Uttarakhand Higher Educational Board', url: 'https://he.uk.gov.in/', category: 'Uttarakhand', department: 'Education Department' },
  { id: 'uk-tech-edu', name: 'Uttarakhand Directorate of Technical Education', url: 'https://dte.uk.gov.in/', category: 'Uttarakhand', department: 'Education Department' },
  { id: 'uk-high-court', name: 'Uttarakhand High Court Legal Administration', url: 'https://ukhighcourt.gov.in/', category: 'Uttarakhand', department: 'Judiciary & Legal' },
  { id: 'uk-edistrict', name: 'Uttarakhand e-District Citizen Services', url: 'https://edistrict.uk.gov.in/', category: 'Uttarakhand', department: 'E-Services' },
  { id: 'uk-tourism', name: 'Uttarakhand State Tourism Development Board', url: 'https://uttarakhandtourism.gov.in/', category: 'Uttarakhand', department: 'Tourism & Culture' },
  { id: 'uk-skill', name: 'Uttarakhand Skill Development Mission Desk', url: 'https://skil.uk.gov.in/', category: 'Uttarakhand', department: 'Employment Services' },
  { id: 'uk-industries', name: 'Uttarakhand Directorate of Industries', url: 'https://industries.uk.gov.in/', category: 'Uttarakhand', department: 'Industries & IT' },

  // --- HIMACHAL PRADESH GOVERNMENT WEBSITES ---
  { id: 'hp-portal', name: 'Himachal Pradesh State Government Portal', url: 'https://himachal.nic.in/', category: 'Himachal Pradesh', department: 'Main State Portal' },
  { id: 'hp-cmo', name: 'Himachal Pradesh Chief Minister Office (CMO)', url: 'https://cmo.hp.gov.in/', category: 'Himachal Pradesh', department: 'Administration' },
  { id: 'hp-nic', name: 'NIC Himachal Pradesh State Center', url: 'https://hp.nic.in/', category: 'Himachal Pradesh', department: 'E-Governance & NIC' },
  { id: 'hp-psc', name: 'Himachal Pradesh Public Service Commission (HPPSC)', url: 'https://hppsc.hp.gov.in/', category: 'Himachal Pradesh', department: 'Recruitment Board' },
  { id: 'hp-ssc', name: 'Himachal Pradesh Staff Selection Commission (HPSSC)', url: 'https://hpssc.hp.gov.in/', category: 'Himachal Pradesh', department: 'Recruitment Board' },
  { id: 'hp-police', name: 'Himachal Pradesh State Police Force', url: 'https://hppolice.gov.in/', category: 'Himachal Pradesh', department: 'Police & Security' },
  { id: 'hp-police-rec', name: 'Himachal State Police Recruitment Portal', url: 'https://hppolice.gov.in/en/recruitment', category: 'Himachal Pradesh', department: 'Police & Security' },
  { id: 'hp-education', name: 'Himachal School Education Department', url: 'https://education.hp.nic.in/', category: 'Himachal Pradesh', department: 'Education Department' },
  { id: 'hp-tet', name: 'Himachal Pradesh Teacher Eligibility Test (HPTET)', url: 'https://hptet.hp.nic.in/', category: 'Himachal Pradesh', department: 'Education Department' },
  { id: 'hp-health', name: 'Himachal Health and Family Welfare Directorate', url: 'https://health.hp.nic.in/', category: 'Himachal Pradesh', department: 'Health Department' },
  { id: 'hp-medical', name: 'Himachal Health & Medical Services Directorate', url: 'https://healthservices.hp.nic.in/', category: 'Himachal Pradesh', department: 'Health Department' },
  { id: 'hp-agri', name: 'Himachal Pradesh Central Agriculture Dept', url: 'https://agriculture.hp.nic.in/', category: 'Himachal Pradesh', department: 'Agriculture Department' },
  { id: 'hp-forest', name: 'Himachal Pradesh Forest State Division', url: 'https://forest.hp.nic.in/', category: 'Himachal Pradesh', department: 'Environment & Forest' },
  { id: 'hp-panchayat', name: 'Himachal Pradesh Panchayati Raj Department', url: 'https://panchayat.hp.nic.in/', category: 'Himachal Pradesh', department: 'Panchayat & Rural Development' },
  { id: 'hp-revenue', name: 'Himachal Pradesh Department of Land Revenue', url: 'https://revenue.hp.nic.in/', category: 'Himachal Pradesh', department: 'Revenue & Land Records' },
  { id: 'hp-land', name: 'Himachal Bhulekh Digital Land Records', url: 'https://bhulekh.hp.nic.in/', category: 'Himachal Pradesh', department: 'Revenue & Land Records' },
  { id: 'hp-housing', name: 'Himachal Pradesh Housing Development Board', url: 'https://housing.hp.nic.in/', category: 'Himachal Pradesh', department: 'Housing & Urban Development' },
  { id: 'hp-finance', name: 'Himachal State Finance & Accounts Treasury', url: 'https://finance.hp.nic.in/', category: 'Himachal Pradesh', department: 'Finance & Treasury' },
  { id: 'hp-welfare', name: 'Himachal SC / ST Welfare Department', url: 'https://stwelfare.hp.nic.in/', category: 'Himachal Pradesh', department: 'Welfare & Social Justice' },
  { id: 'hp-wcd', name: 'Himachal Women & Child Empowerment Directorate', url: 'https://wcd.hp.nic.in/', category: 'Himachal Pradesh', department: 'Welfare & Social Justice' },
  { id: 'hp-higher-edu', name: 'Himachal Higher Secondary Educational Council', url: 'https://he.hp.nic.in/', category: 'Himachal Pradesh', department: 'Education Department' },
  { id: 'hp-tech-edu', name: 'Himachal Directorate of Technical Education (DTE)', url: 'https://dte.hp.nic.in/', category: 'Himachal Pradesh', department: 'Education Department' },
  { id: 'hp-high-court', name: 'Himachal Pradesh High Court Justice Portal', url: 'https://himachalhighcourt.nic.in/', category: 'Himachal Pradesh', department: 'Judiciary & Legal' },
  { id: 'hp-edistrict', name: 'Himachal Pradesh e-District Service Hub', url: 'https://edistrict.hp.nic.in/', category: 'Himachal Pradesh', department: 'E-Services' },
  { id: 'hp-tourism', name: 'Himachal Pradesh State Tourism Board', url: 'https://himachaltourism.gov.in/', category: 'Himachal Pradesh', department: 'Tourism & Culture' },
  { id: 'hp-skill', name: 'Himachal State Skill Development Mission', url: 'https://skil.hp.nic.in/', category: 'Himachal Pradesh', department: 'Employment Services' },
  { id: 'hp-industries', name: 'Himachal Directorate of Industries & Commerce', url: 'https://industries.hp.nic.in/', category: 'Himachal Pradesh', department: 'Industries & IT' },

  // --- JAMMU AND KASHMIR (UT) GOVERNMENT WEBSITES ---
  { id: 'jk-portal', name: 'Jammu & Kashmir Government Portal', url: 'https://jk.gov.in/', category: 'Jammu & Kashmir', department: 'Main State Portal' },
  { id: 'jk-psc', name: 'J&K Public Service Commission (JKPSC)', url: 'https://jkpsc.nic.in/', category: 'Jammu & Kashmir', department: 'Recruitment Board' },
  { id: 'jk-police', name: 'Jammu & Kashmir Police Force', url: 'https://jkpolice.gov.in/', category: 'Jammu & Kashmir', department: 'Police & Security' },
  { id: 'jk-teachers', name: 'J&K School Education Ministry', url: 'https://education.gov.in/', category: 'Jammu & Kashmir', department: 'Education Department' },
  { id: 'jk-health', name: 'J&K Department of Family Welfare', url: 'https://health.jk.gov.in/', category: 'Jammu & Kashmir', department: 'Health Department' },

  // --- TRIPURA GOVERNMENT WEBSITES ---
  { id: 'tr-portal', name: 'Tripura State Government Portal', url: 'https://tripura.gov.in/', category: 'Tripura', department: 'Main State Portal' },
  { id: 'tr-cmo', name: 'Tripura Chief Minister Office (CMO)', url: 'https://cmo.tripura.gov.in/', category: 'Tripura', department: 'Administration' },
  { id: 'tr-nic', name: 'NIC Tripura Center E-Services Portal', url: 'https://tripura.nic.in/', category: 'Tripura', department: 'E-Governance & NIC' },
  { id: 'tr-psc', name: 'Tripura Public Service Commission (TPSC)', url: 'https://tppsc.tripura.gov.in/', category: 'Tripura', department: 'Recruitment Board' },
  { id: 'tr-police', name: 'Tripura State Police Force HQ', url: 'https://police.tripura.gov.in/', category: 'Tripura', department: 'Police & Security' },
  { id: 'tr-police-rec', name: 'Tripura Police Force Recruitment Division', url: 'https://police.tripura.gov.in/en/recruitment', category: 'Tripura', department: 'Police & Security' },
  { id: 'tr-education', name: 'Tripura Secondary Education Department', url: 'https://education.tripura.gov.in/', category: 'Tripura', department: 'Education Department' },
  { id: 'tr-tet', name: 'Tripura Teacher Eligibility Test (TET)', url: 'https://tripuratet.in/', category: 'Tripura', department: 'Education Department' },
  { id: 'tr-health', name: 'Tripura Health & Family Welfare Ministry', url: 'https://health.tripura.gov.in/', category: 'Tripura', department: 'Health Department' },
  { id: 'tr-medical', name: 'Tripura Director of Health Services', url: 'https://healthservices.tripura.gov.in/', category: 'Tripura', department: 'Health Department' },
  { id: 'tr-agri', name: 'Tripura Department of Agriculture Board', url: 'https://agriculture.tripura.gov.in/', category: 'Tripura', department: 'Agriculture Department' },
  { id: 'tr-forest', name: 'Tripura Forest Division Office', url: 'https://forest.tripura.gov.in/', category: 'Tripura', department: 'Environment & Forest' },
  { id: 'tr-panchayat', name: 'Tripura Directorate of Panchayati Raj', url: 'https://prd.tripura.gov.in/', category: 'Tripura', department: 'Panchayat & Rural Development' },
  { id: 'tr-revenue', name: 'Tripura Revenue & Land Records Board', url: 'https://revenue.tripura.gov.in/', category: 'Tripura', department: 'Revenue & Land Records' },
  { id: 'tr-housing', name: 'Tripura State Housing Board', url: 'https://housing.tripura.gov.in/', category: 'Tripura', department: 'Housing & Urban Development' },
  { id: 'tr-finance', name: 'Tripura Central Finance Ministry Office', url: 'https://finance.tripura.gov.in/', category: 'Tripura', department: 'Finance & Treasury' },
  { id: 'tr-welfare', name: 'Tripura Tribal & SC / ST Welfare Dept', url: 'https://stwelfare.tripura.gov.in/', category: 'Tripura', department: 'Welfare & Social Justice' },
  { id: 'tr-wcd', name: 'Tripura Women & Child Empowerment Directorate', url: 'https://wcd.tripura.gov.in/', category: 'Tripura', department: 'Welfare & Social Justice' },
  { id: 'tr-higher-edu', name: 'Tripura Higher Education Board Office', url: 'https://he.tripura.gov.in/', category: 'Tripura', department: 'Education Department' },
  { id: 'tr-high-court', name: 'Tripura State High Court Justice Portal', url: 'https://tripurahighcourt.gov.in/', category: 'Tripura', department: 'Judiciary & Legal' },
  { id: 'tr-edistrict', name: 'Tripura State e-District Portal', url: 'https://edistrict.tripura.gov.in/', category: 'Tripura', department: 'E-Services' },
  { id: 'tr-tourism', name: 'Tripura Tourism Development Corporation', url: 'https://tripuratourism.gov.in/', category: 'Tripura', department: 'Tourism & Culture' },
  { id: 'tr-industries', name: 'Tripura Directorate of Industries & Commerce', url: 'https://industries.tripura.gov.in/', category: 'Tripura', department: 'Industries & IT' },

  // --- MANIPUR GOVERNMENT WEBSITES ---
  { id: 'mn-portal', name: 'Manipur State Government Portal', url: 'https://manipur.gov.in/', category: 'Manipur', department: 'Main State Portal' },
  { id: 'mn-cmo', name: 'Manipur Chief Minister Office (CMO)', url: 'https://cmo.manipur.gov.in/', category: 'Manipur', department: 'Administration' },
  { id: 'mn-nic', name: 'NIC Manipur E-Governance Portal', url: 'https://manipur.nic.in/', category: 'Manipur', department: 'E-Governance & NIC' },
  { id: 'mn-psc', name: 'Manipur Public Service Commission (MPPSC)', url: 'https://mppsc.manipur.gov.in/', category: 'Manipur', department: 'Recruitment Board' },
  { id: 'mn-police', name: 'Manipur State Police Department HQ', url: 'https://police.manipur.gov.in/', category: 'Manipur', department: 'Police & Security' },
  { id: 'mn-police-rec', name: 'Manipur State Police Recruitment Center', url: 'https://police.manipur.gov.in/en/recruitment', category: 'Manipur', department: 'Police & Security' },
  { id: 'mn-education', name: 'Manipur Secondary Education Department', url: 'https://education.manipur.gov.in/', category: 'Manipur', department: 'Education Department' },
  { id: 'mn-health', name: 'Manipur Health & Family Welfare Ministry', url: 'https://health.manipur.gov.in/', category: 'Manipur', department: 'Health Department' },
  { id: 'mn-medical', name: 'Manipur Directorate of Health Services Office', url: 'https://healthservices.manipur.gov.in/', category: 'Manipur', department: 'Health Department' },
  { id: 'mn-agri', name: 'Manipur Directorate of Agriculture', url: 'https://agriculture.manipur.gov.in/', category: 'Manipur', department: 'Agriculture Department' },
  { id: 'mn-forest', name: 'Manipur State Forest Office', url: 'https://forest.manipur.gov.in/', category: 'Manipur', department: 'Environment & Forest' },
  { id: 'mn-panchayat', name: 'Manipur Directorate of Rural & Panchayats', url: 'https://pds.manipur.gov.in/', category: 'Manipur', department: 'Panchayat & Rural Development' },
  { id: 'mn-revenue', name: 'Manipur Board of Land Revenue', url: 'https://revenue.manipur.gov.in/', category: 'Manipur', department: 'Revenue & Land Records' },
  { id: 'mn-housing', name: 'Manipur State Housing Division', url: 'https://housing.manipur.gov.in/', category: 'Manipur', department: 'Housing & Urban Development' },
  { id: 'mn-finance', name: 'Manipur Finance and Taxation Division', url: 'https://finance.manipur.gov.in/', category: 'Manipur', department: 'Finance & Treasury' },
  { id: 'mn-welfare', name: 'Manipur SC / ST Tribal Welfare Dept', url: 'https://stwelfare.manipur.gov.in/', category: 'Manipur', department: 'Welfare & Social Justice' },
  { id: 'mn-wcd', name: 'Manipur Directorate of Women & Child welfare', url: 'https://wcd.manipur.gov.in/', category: 'Manipur', department: 'Welfare & Social Justice' },
  { id: 'mn-higher-edu', name: 'Manipur Higher Secondary Education Council', url: 'https://he.manipur.gov.in/', category: 'Manipur', department: 'Education Department' },
  { id: 'mn-high-court', name: 'Manipur High Court Legal Portal', url: 'https://manipurhighcourt.nic.in/', category: 'Manipur', department: 'Judiciary & Legal' },
  { id: 'mn-edistrict', name: 'Manipur e-District State Center', url: 'https://edistrict.manipur.gov.in/', category: 'Manipur', department: 'E-Services' },
  { id: 'mn-tourism', name: 'Manipur Tourism Board Office', url: 'https://manipurtourism.gov.in/', category: 'Manipur', department: 'Tourism & Culture' },
  { id: 'mn-industries', name: 'Manipur Directorate of Industries & Commerce', url: 'https://industries.manipur.gov.in/', category: 'Manipur', department: 'Industries & IT' },

  // --- MEGHALAYA GOVERNMENT WEBSITES ---
  { id: 'me-portal', name: 'Meghalaya State Government Portal', url: 'https://meghalaya.gov.in/', category: 'Meghalaya', department: 'Main State Portal' },
  { id: 'me-cmo', name: 'Meghalaya Chief Minister Office (CMO)', url: 'https://cmo.meghalaya.gov.in/', category: 'Meghalaya', department: 'Administration' },
  { id: 'me-nic', name: 'NIC Meghalaya Services Portal', url: 'https://meghalaya.nic.in/', category: 'Meghalaya', department: 'E-Governance & NIC' },
  { id: 'me-psc', name: 'Meghalaya Public Service Commission (MPSC)', url: 'https://mpsc.meghalaya.gov.in/', category: 'Meghalaya', department: 'Recruitment Board' },
  { id: 'me-police', name: 'Meghalaya Police Headquarters', url: 'https://police.meghalaya.gov.in/', category: 'Meghalaya', department: 'Police & Security' },
  { id: 'me-police-rec', name: 'Meghalaya Police Recruitment Division', url: 'https://police.meghalaya.gov.in/en/recruitment', category: 'Meghalaya', department: 'Police & Security' },
  { id: 'me-teachers', name: 'Meghalaya State Education Board', url: 'https://education.meghalaya.gov.in/', category: 'Meghalaya', department: 'Education Department' },
  { id: 'me-health', name: 'Meghalaya Directorate of Health & Welfare', url: 'https://health.meghalaya.gov.in/', category: 'Meghalaya', department: 'Health Department' },
  { id: 'me-medical', name: 'Meghalaya Health Services Directorate', url: 'https://healthservices.meghalaya.gov.in/', category: 'Meghalaya', department: 'Health Department' },
  { id: 'me-agri', name: 'Meghalaya Department of Agriculture', url: 'https://agriculture.meghalaya.gov.in/', category: 'Meghalaya', department: 'Agriculture Department' },
  { id: 'me-forest', name: 'Meghalaya Forest and Wildlife Division', url: 'https://forest.meghalaya.gov.in/', category: 'Meghalaya', department: 'Environment & Forest' },
  { id: 'me-panchayat', name: 'Meghalaya Panchayati Raj & Rural (PDS)', url: 'https://pds.meghalaya.gov.in/', category: 'Meghalaya', department: 'Panchayat & Rural Development' },
  { id: 'me-revenue', name: 'Meghalaya Revenue and Land Survey Board', url: 'https://revenue.meghalaya.gov.in/', category: 'Meghalaya', department: 'Revenue & Land Records' },
  { id: 'me-housing', name: 'Meghalaya State Housing Directorate', url: 'https://housing.meghalaya.gov.in/', category: 'Meghalaya', department: 'Housing & Urban Development' },
  { id: 'me-finance', name: 'Meghalaya Central Finance Department', url: 'https://finance.meghalaya.gov.in/', category: 'Meghalaya', department: 'Finance & Treasury' },
  { id: 'me-welfare', name: 'Meghalaya Tribes and SC/ST Welfare Dept', url: 'https://stwelfare.meghalaya.gov.in/', category: 'Meghalaya', department: 'Welfare & Social Justice' },
  { id: 'me-wcd', name: 'Meghalaya Directorate of Women & Child welfare', url: 'https://wcd.meghalaya.gov.in/', category: 'Meghalaya', department: 'Welfare & Social Justice' },
  { id: 'me-higher-edu', name: 'Meghalaya Higher School and Board Council', url: 'https://he.meghalaya.gov.in/', category: 'Meghalaya', department: 'Education Department' },
  { id: 'me-high-court', name: 'Meghalaya High Court Legal Administration', url: 'https://meghalayahighcourt.gov.in/', category: 'Meghalaya', department: 'Judiciary & Legal' },
  { id: 'me-edistrict', name: 'Meghalaya e-District Support Desk', url: 'https://edistrict.meghalaya.gov.in/', category: 'Meghalaya', department: 'E-Services' },
  { id: 'me-tourism', name: 'Meghalaya State Tourism Board', url: 'https://meghalayatourism.gov.in/', category: 'Meghalaya', department: 'Tourism & Culture' },
  { id: 'me-industries', name: 'Meghalaya Directorate of Industries & Commerce', url: 'https://industries.meghalaya.gov.in/', category: 'Meghalaya', department: 'Industries & IT' },

  // --- MIZORAM GOVERNMENT WEBSITES ---
  { id: 'mz-portal', name: 'Mizoram State Government Portal', url: 'https://mizoram.nic.in/', category: 'Mizoram', department: 'Main State Portal' },
  { id: 'mz-cmo', name: 'Mizoram Chief Minister Office (CMO)', url: 'https://cmo.mizoram.gov.in/', category: 'Mizoram', department: 'Administration' },
  { id: 'mz-nic', name: 'NIC Mizoram Services Portal', url: 'https://mizoram.nic.in/', category: 'Mizoram', department: 'E-Governance & NIC' },
  { id: 'mz-psc', name: 'Mizoram Public Service Commission (MPSC)', url: 'https://secs.mizoram.gov.in/', category: 'Mizoram', department: 'Recruitment Board' },
  { id: 'mz-police', name: 'Mizoram State Police Force', url: 'https://police.mizoram.gov.in/', category: 'Mizoram', department: 'Police & Security' },
  { id: 'mz-police-rec', name: 'Mizoram Police Force Recruitment Desk', url: 'https://police.mizoram.gov.in/en/recruitment', category: 'Mizoram', department: 'Police & Security' },
  { id: 'mz-education', name: 'Mizoram State School Education Board', url: 'https://education.mizoram.gov.in/', category: 'Mizoram', department: 'Education Department' },
  { id: 'mz-health', name: 'Mizoram State Health services Division', url: 'https://health.mizoram.gov.in/', category: 'Mizoram', department: 'Health Department' },
  { id: 'mz-agriculture', name: 'Mizoram Directorate of Agriculture Board', url: 'https://agriculture.mizoram.gov.in/', category: 'Mizoram', department: 'Agriculture Department' },
  { id: 'mz-forest', name: 'Mizoram Forestry and Wildlife Section', url: 'https://forest.mizoram.gov.in/', category: 'Mizoram', department: 'Environment & Forest' },
  { id: 'mz-revenue', name: 'Mizoram Board of Revenue and Land Surveys', url: 'https://revenue.mizoram.gov.in/', category: 'Mizoram', department: 'Revenue & Land Records' },
  { id: 'mz-housing', name: 'Mizoram State Housing & Urban department', url: 'https://housing.mizoram.gov.in/', category: 'Mizoram', department: 'Housing & Urban Development' },
  { id: 'mz-finance', name: 'Mizoram Central Finance Division', url: 'https://finance.mizoram.gov.in/', category: 'Mizoram', department: 'Finance & Treasury' },
  { id: 'mz-wcd', name: 'Mizoram Women & Child Empowerment Directorate', url: 'https://wcd.mizoram.gov.in/', category: 'Mizoram', department: 'Welfare & Social Justice' },
  { id: 'mz-higher-edu', name: 'Mizoram Board of Higher Education Office', url: 'https://he.mizoram.gov.in/', category: 'Mizoram', department: 'Education Department' },
  { id: 'mz-high-court', name: 'Mizoram High Court Judicial Desk', url: 'https://mizoramhighcourt.nic.in/', category: 'Mizoram', department: 'Judiciary & Legal' },
  { id: 'mz-edistrict', name: 'Mizoram e-District Citizen Hub', url: 'https://edistrict.mizoram.gov.in/', category: 'Mizoram', department: 'E-Services' },
  { id: 'mz-tourism', name: 'Mizoram State Tourism Department', url: 'https://mizoramtourism.gov.in/', category: 'Mizoram', department: 'Tourism & Culture' },
  { id: 'mz-industries', name: 'Mizoram Directorate of Industries & Trade', url: 'https://industries.mizoram.gov.in/', category: 'Mizoram', department: 'Industries & IT' },

  // --- NAGALAND GOVERNMENT WEBSITES ---
  { id: 'ng-portal', name: 'Nagaland State Government Portal', url: 'https://nagaland.gov.in/', category: 'Nagaland', department: 'Main State Portal' },
  { id: 'ng-cmo', name: 'Nagaland Chief Minister Office (CMO)', url: 'https://cmo.nagaland.gov.in/', category: 'Nagaland', department: 'Administration' },
  { id: 'ng-nic', name: 'NIC Nagaland E-Governance Services', url: 'https://nagaland.nic.in/', category: 'Nagaland', department: 'E-Governance & NIC' },
  { id: 'ng-psc', name: 'Nagaland Public Service Commission (NPSC)', url: 'https://npsc.nagaland.gov.in/', category: 'Nagaland', department: 'Recruitment Board' },
  { id: 'ng-police', name: 'Nagaland State Police Headquarters', url: 'https://police.nagaland.gov.in/', category: 'Nagaland', department: 'Police & Security' },
  { id: 'ng-police-rec', name: 'Nagaland Police Force Recruitment Unit', url: 'https://police.nagaland.gov.in/en/recruitment', category: 'Nagaland', department: 'Police & Security' },
  { id: 'ng-education', name: 'Nagaland State School Education Board', url: 'https://education.nagaland.gov.in/', category: 'Nagaland', department: 'Education Department' },
  { id: 'ng-health', name: 'Nagaland Directorate of Health & Welfare', url: 'https://health.nagaland.gov.in/', category: 'Nagaland', department: 'Health Department' },
  { id: 'ng-agriculture', name: 'Nagaland Directorate of Agriculture Office', url: 'https://agriculture.nagaland.gov.in/', category: 'Nagaland', department: 'Agriculture Department' },
  { id: 'ng-forest', name: 'Nagaland Forestry and Protecting Division', url: 'https://forest.nagaland.gov.in/', category: 'Nagaland', department: 'Environment & Forest' },
  { id: 'ng-revenue', name: 'Nagaland Directorate of Land Revenue', url: 'https://revenue.nagaland.gov.in/', category: 'Nagaland', department: 'Revenue & Land Records' },
  { id: 'ng-housing', name: 'Nagaland State Housing Office', url: 'https://housing.nagaland.gov.in/', category: 'Nagaland', department: 'Housing & Urban Development' },
  { id: 'ng-finance', name: 'Nagaland Central Finance Ministry Department', url: 'https://finance.nagaland.gov.in/', category: 'Nagaland', department: 'Finance & Treasury' },
  { id: 'ng-wcd', name: 'Nagaland Women & Child Welfare Directorate', url: 'https://wcd.nagaland.gov.in/', category: 'Nagaland', department: 'Welfare & Social Justice' },
  { id: 'ng-higher-edu', name: 'Nagaland Higher School Educational Council', url: 'https://he.nagaland.gov.in/', category: 'Nagaland', department: 'Education Department' },
  { id: 'ng-high-court', name: 'Nagaland High Court Justice Board', url: 'https://nagalandhighcourt.nic.in/', category: 'Nagaland', department: 'Judiciary & Legal' },
  { id: 'ng-edistrict', name: 'Nagaland State e-District Portal', url: 'https://edistrict.nagaland.gov.in/', category: 'Nagaland', department: 'E-Services' },
  { id: 'ng-tourism', name: 'Nagaland Tourism Development Board', url: 'https://nagalandtourism.gov.in/', category: 'Nagaland', department: 'Tourism & Culture' },
  { id: 'ng-industries', name: 'Nagaland Directorate of Industries and Trade', url: 'https://industries.nagaland.gov.in/', category: 'Nagaland', department: 'Industries & IT' },

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
  { id: 'ga-cmo', name: 'Goa Chief Minister Office (CMO)', url: 'https://cmo.goa.gov.in/', category: 'Goa', department: 'Administration' },
  { id: 'ga-nic', name: 'NIC Goa Digital Center Portal', url: 'https://goa.gov.in/', category: 'Goa', department: 'E-Governance & NIC' },
  { id: 'ga-psc', name: 'Goa Public Service Commission (GPSC)', url: 'https://gpsc.goa.gov.in/', category: 'Goa', department: 'Recruitment Board' },
  { id: 'ga-police', name: 'Goa Police Department HQ', url: 'https://police.goa.gov.in/', category: 'Goa', department: 'Police & Security' },
  { id: 'ga-police-rec', name: 'Goa Police Recruitment Board Division', url: 'https://police.goa.gov.in/en/recruitment', category: 'Goa', department: 'Police & Security' },
  { id: 'ga-education', name: 'Goa School Education Directorate Office', url: 'https://education.goa.gov.in/', category: 'Goa', department: 'Education Department' },
  { id: 'ga-tet', name: 'Goa Teacher Eligibility Test (TET) Board', url: 'https://goatet.goa.gov.in/', category: 'Goa', department: 'Education Department' },
  { id: 'ga-health', name: 'Goa Health and Family Welfare Services', url: 'https://health.goa.gov.in/', category: 'Goa', department: 'Health Department' },
  { id: 'ga-medical', name: 'Goa Central Medical and Health Department', url: 'https://healthservices.goa.gov.in/', category: 'Goa', department: 'Health Department' },
  { id: 'ga-agri', name: 'Goa Directorate of Agriculture Division', url: 'https://agriculture.goa.gov.in/', category: 'Goa', department: 'Agriculture Department' },
  { id: 'ga-forest', name: 'Goa Forest State Safeguard Division', url: 'https://forest.goa.gov.in/', category: 'Goa', department: 'Environment & Forest' },
  { id: 'ga-panchayat', name: 'Goa State Panchayat Directorate Office', url: 'https://panchayat.goa.gov.in/', category: 'Goa', department: 'Panchayat & Rural Development' },
  { id: 'ga-revenue', name: 'Goa State Land Revenue Board', url: 'https://revenue.goa.gov.in/', category: 'Goa', department: 'Revenue & Land Records' },
  { id: 'ga-land', name: 'Goa Bhulekh Digital Land Records Office', url: 'https://bhulekh.goa.gov.in/', category: 'Goa', department: 'Revenue & Land Records' },

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
