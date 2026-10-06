create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  venue text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  registration_url text,
  created_at timestamptz not null default now(),
  constraint event_dates_valid check (ends_at >= starts_at)
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  group_type text not null check (group_type in ('faculty', 'core', 'member')),
  details text not null,
  bio text not null default '',
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('book', 'link', 'archive')),
  title text not null,
  subtitle text not null default '',
  description text not null default '',
  url text,
  topic text not null default '',
  level text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_items (
  id uuid primary key default gen_random_uuid(),
  icon text not null default '',
  label text not null,
  value text not null,
  url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.qotd (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  display_date date not null unique,
  topic text not null default '',
  difficulty text not null default '',
  note text not null default '',
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.members enable row level security;
alter table public.resources enable row level security;
alter table public.contact_items enable row level security;
alter table public.faqs enable row level security;
alter table public.qotd enable row level security;

insert into storage.buckets (id, name, public)
values ('team-photos', 'team-photos', true)
on conflict (id) do update set public = true;

insert into public.events (title, description, category, venue, starts_at, ends_at)
select 'Club Induction', 'Introduction to the club, its activities, and how to get involved.', 'Workshop', 'NLHC G-8', '2026-04-09 19:00:00+05:30', '2026-04-09 19:30:00+05:30'
where not exists (select 1 from public.events where title = 'Club Induction');

insert into public.events (title, description, category, venue, starts_at, ends_at)
select 'Integration Bee 2026', 'Integration Bee Competition.', 'Competition', 'NLHC G-8', '2026-04-09 19:00:00+05:30', '2026-04-10 21:00:00+05:30'
where not exists (select 1 from public.events where title = 'Integration Bee 2026');

insert into public.members (name, role, group_type, details, bio, image_url, sort_order)
select seed.* from (values
  ('Prof. S. P. Tiwari', 'Faculty in-charge', 'faculty', 'Mathematics & Computing Department', 'Category Theory, and Fuzzy Automata Theory', '/team/photos/sptiwari.png', 1),
  ('Ayush Verma', 'Coordinator', 'core', '3rd Year, B.Tech (Mechanical)', 'Everyone is complex, unique and incomparable but can be equal.', '/team/photos/ayush.jpeg', 1),
  ('Abhimanyu Yadav', 'Tech Coordinator', 'core', '3rd Year, B.Tech (Mechanical)', 'An idiot with a plan can beat a genius without plan', '/team/photos/abhimanyu.jpeg', 2),
  ('Subrat Panda', 'Member', 'member', '3rd Year, B.Tech (Electrical)', 'The power to constrain an adversary may depend on the power to bind oneself.', '/team/photos/subrat.jpeg', 1),
  ('Saranshh Rastogi', 'Member', 'member', '3rd Year, B.Tech (Electrical)', 'Equations are poetry.', null, 2),
  ('Aarya Muniyavula', 'Member', 'member', '3rd Year, B.Tech (Mechanical)', 'In the Bleak Midwinter.', '/team/photos/aarya.jpeg', 3),
  ('Ansh Mathur', 'Member', 'member', '3rd Year, B.Tech (Mechanical)', 'Everything is a risk. Not doing anything is also a risk.', '/team/photos/ansh.jpeg', 4),
  ('Yash Jha', 'Member', 'member', '3rd Year, B.Tech (Mathematics and Computing)', 'It is known; or is it?', '/team/photos/yash.jpeg', 5),
  ('Anukul Tiwari', 'Member', 'member', '3rd Year, B.Tech (Environmental)', 'Until I get there I won''t give up.', '/team/photos/anukul.jpeg', 6),
  ('Kiran Pal', 'Member', 'member', '3rd Year, B.Tech (Mathematics and Computing)', 'Any loop can be shrunk.', '/team/photos/kiran.jpeg', 7),
  ('Sreenandan Shashidharan', 'Member', 'member', '3rd Year, B.Tech (Computer Science and Engineering)', 'I like Maths.', '/team/photos/sreenandan.jpeg', 8),
  ('Keshav Kumar', 'Member', 'member', '3rd Year, B.Tech (Chemical Engineering)', '2 dimensional being.', '/team/photos/keshav.jpeg', 9)
) as seed(name, role, group_type, details, bio, image_url, sort_order)
where not exists (select 1 from public.members where public.members.name = seed.name);

insert into public.resources (kind, title, subtitle, description, url, topic, level, sort_order)
select seed.* from (values
  ('book', 'Game Theory', 'Michael Maschler, Shmuel Zamir, Eilon Solan', '', null, 'Game Theory', 'Advanced', 1),
  ('book', 'Abstract Algebra', 'Dummit & Foote', '', null, 'Algebra', 'Intermediate', 2),
  ('book', 'Topology', 'James Munkres', '', null, 'Topology', 'Intermediate', 3),
  ('book', 'Introduction to the Theory of Numbers', 'Hardy & Wright', '', null, 'Number Theory', 'Intermediate', 4),
  ('book', 'Linear Algebra Done Right', 'Sheldon Axler', '', null, 'Linear Algebra', 'Beginner', 5),
  ('book', 'The Art of Problem Solving Vol. 1 & 2', 'Sandor Lehoczky', '', null, 'Olympiad', 'Beginner', 6),
  ('book', 'A First Course in Probability', 'Sheldon Ross', '', null, 'Probability', 'Intermediate', 7),
  ('book', 'Algebraic Geometry', 'Hartshorne', '', null, 'Geometry', 'Expert', 8),
  ('link', 'MIT OpenCourseWare', '', 'Free lecture notes and problem sets from MIT''s math department.', 'https://ocw.mit.edu/courses/mathematics/', '', '', 1),
  ('link', 'Art of Problem Solving', '', 'Forum, resources and courses for olympiad mathematics.', 'https://artofproblemsolving.com', '', '', 2),
  ('link', '3Blue1Brown', '', 'Visual intuition for deep mathematical ideas.', 'https://www.3blue1brown.com', '', '', 3),
  ('link', 'Project Euler', '', 'Challenging mathematical programming problems.', 'https://projecteuler.net', '', '', 4),
  ('link', 'Khan Academy', '', 'From arithmetic to multivariable calculus - free and excellent.', 'https://www.khanacademy.org/math', '', '', 5),
  ('link', 'Wolfram MathWorld', '', 'Comprehensive online encyclopedia of mathematics.', 'https://mathworld.wolfram.com', '', '', 6),
  ('archive', 'IMO Problems Archive', '', 'Every International Math Olympiad problem from 1959 onwards.', 'https://www.imo-official.org/problems.aspx', '', '', 1),
  ('archive', 'CMI Entrance Paper Collection', '', 'Past papers for Chennai Mathematical Institute entrance exam.', 'https://www.cmi.ac.in/admissions/', '', '', 2),
  ('archive', 'NBHM Written Test Papers', '', 'National Board for Higher Mathematics scholarship exam papers.', 'https://www.nbhm.dae.gov.in/', '', '', 3),
  ('archive', 'TIFR GS Mathematics', '', 'TIFR Graduate School admission test papers in mathematics.', 'https://www.tifr.res.in/academics/past_question_papers.php', '', '', 4)
) as seed(kind, title, subtitle, description, url, topic, level, sort_order)
where not exists (select 1 from public.resources where public.resources.title = seed.title);

insert into public.contact_items (icon, label, value, url, sort_order)
select seed.* from (values
  ('📍', 'Location', 'Mathematics Department, IIT(ISM) Dhanbad, Jharkhand - 826 004', null, 1),
  ('✉️', 'Email', 'mathsclub@iitism.ac.in', 'mailto:mathsclub@iitism.ac.in', 2),
  ('🌐', 'Social Media', '@mathsclub.iitism on Instagram', null, 3)
) as seed(icon, label, value, url, sort_order)
where not exists (select 1 from public.contact_items where public.contact_items.label = seed.label);

insert into public.faqs (question, answer, sort_order)
select seed.* from (values
  ('Who can join?', 'Any student of IIT(ISM) Dhanbad - any year, any branch.', 1),
  ('Is there a membership fee?', 'No fee. All activities are free for registered members.', 2),
  ('How do I join?', 'Fill the form above or reach out via email.', 3)
) as seed(question, answer, sort_order)
where not exists (select 1 from public.faqs where public.faqs.question = seed.question);
