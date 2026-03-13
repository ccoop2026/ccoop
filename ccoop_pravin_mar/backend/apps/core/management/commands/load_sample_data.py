"""
Management command to load sample data for ccoop.in MVP
Creates sample campuses, drops, variants, and users for testing
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.core.models import Campus, Drop, Variant, Pledge

User = get_user_model()


class Command(BaseCommand):
    help = 'Load sample data for ccoop MVP testing'

    def handle(self, *args, **options):
        self.stdout.write('Loading sample data...')

        # Clear existing data (careful in production!)
        self.stdout.write('Clearing existing data...')
        Pledge.objects.all().delete()
        Variant.objects.all().delete()
        Drop.objects.all().delete()
        Campus.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()

        # Create sample campuses
        self.stdout.write('Creating campuses...')
        iit_bombay = Campus.objects.create(
            name='IIT Bombay',
            slug='iit-bombay',
            description='Indian Institute of Technology, Bombay - Premier engineering institution'
        )

        iit_delhi = Campus.objects.create(
            name='IIT Delhi',
            slug='iit-delhi',
            description='Indian Institute of Technology, Delhi - Leading technology institute'
        )

        bits_pilani = Campus.objects.create(
            name='BITS Pilani',
            slug='bits-pilani',
            description='Birla Institute of Technology and Science, Pilani'
        )

        # Create sample users with different roles
        self.stdout.write('Creating sample users with roles...')

        # Students
        student1 = User.objects.create_user(
            username='rahul_student',
            email='rahul@iitb.ac.in',
            password='password123',
            phone='+919876543210',
            role='STUDENT',
            home_campus=iit_bombay,
            first_name='Rahul',
            last_name='Sharma'
        )

        student2 = User.objects.create_user(
            username='priya_student',
            email='priya@iitd.ac.in',
            password='password123',
            phone='+919876543211',
            role='STUDENT',
            home_campus=iit_delhi,
            first_name='Priya',
            last_name='Verma'
        )

        student3 = User.objects.create_user(
            username='amit_student',
            email='amit@bits.ac.in',
            password='password123',
            phone='+919876543212',
            role='STUDENT',
            home_campus=bits_pilani,
            first_name='Amit',
            last_name='Kumar'
        )

        # Drop Hosts (one per campus)
        host_iitb = User.objects.create_user(
            username='host_iitb',
            email='host@iitb.ac.in',
            password='password123',
            phone='+919876543220',
            role='DROP_HOST',
            managed_campus=iit_bombay,
            first_name='Vikram',
            last_name='Patel'
        )

        host_iitd = User.objects.create_user(
            username='host_iitd',
            email='host@iitd.ac.in',
            password='password123',
            phone='+919876543221',
            role='DROP_HOST',
            managed_campus=iit_delhi,
            first_name='Anjali',
            last_name='Singh'
        )

        # Campus Curators (one per campus)
        curator_iitb = User.objects.create_user(
            username='curator_iitb',
            email='curator@iitb.ac.in',
            password='password123',
            phone='+919876543230',
            role='CAMPUS_CURATOR',
            managed_campus=iit_bombay,
            first_name='Rajesh',
            last_name='Gupta'
        )

        curator_iitd = User.objects.create_user(
            username='curator_iitd',
            email='curator@iitd.ac.in',
            password='password123',
            phone='+919876543231',
            role='CAMPUS_CURATOR',
            managed_campus=iit_delhi,
            first_name='Meera',
            last_name='Reddy'
        )

        # Global Admin
        admin_user = User.objects.create_user(
            username='admin_global',
            email='admin@ccoop.in',
            password='password123',
            phone='+919876543240',
            role='GLOBAL_ADMIN',
            first_name='Sanjay',
            last_name='Mehta',
            is_staff=True
        )

        # Create sample drops for IIT Bombay
        self.stdout.write('Creating drops...')

        # Drop 1: IIT Bombay Hoodies
        drop1 = Drop.objects.create(
            campus=iit_bombay,
            title='IIT Bombay Official Hoodies - Winter 2026',
            description='Premium quality hoodies with embroidered IIT Bombay logo. Perfect for winter!',
            live=True
        )

        # Variants for Drop 1
        Variant.objects.create(drop=drop1, color='Navy Blue', size='S', moq=20)
        Variant.objects.create(drop=drop1, color='Navy Blue', size='M', moq=20)
        Variant.objects.create(drop=drop1, color='Navy Blue', size='L', moq=20)
        Variant.objects.create(drop=drop1, color='Navy Blue', size='XL', moq=20)
        Variant.objects.create(drop=drop1, color='Black', size='S', moq=20)
        Variant.objects.create(drop=drop1, color='Black', size='M', moq=20)
        Variant.objects.create(drop=drop1, color='Black', size='L', moq=20)
        Variant.objects.create(drop=drop1, color='Black', size='XL', moq=20)

        # Drop 2: IIT Bombay T-Shirts
        drop2 = Drop.objects.create(
            campus=iit_bombay,
            title='IIT Bombay Tech Fest T-Shirts',
            description='Exclusive Tech Fest 2026 merchandise. Limited edition design!',
            live=True
        )

        # Variants for Drop 2
        Variant.objects.create(drop=drop2, color='White', size='S', moq=30)
        Variant.objects.create(drop=drop2, color='White', size='M', moq=30)
        Variant.objects.create(drop=drop2, color='White', size='L', moq=30)
        Variant.objects.create(drop=drop2, color='White', size='XL', moq=30)
        Variant.objects.create(drop=drop2, color='Red', size='S', moq=30)
        Variant.objects.create(drop=drop2, color='Red', size='M', moq=30)
        Variant.objects.create(drop=drop2, color='Red', size='L', moq=30)
        Variant.objects.create(drop=drop2, color='Red', size='XL', moq=30)

        # Drop 3: IIT Delhi Merchandise
        drop3 = Drop.objects.create(
            campus=iit_delhi,
            title='IIT Delhi Alumni Reunion Collection',
            description='Special edition merchandise for IIT Delhi Alumni Reunion 2026',
            live=True
        )

        # Variants for Drop 3
        Variant.objects.create(drop=drop3, color='Green', size='M', moq=25)
        Variant.objects.create(drop=drop3, color='Green', size='L', moq=25)
        Variant.objects.create(drop=drop3, color='Green', size='XL', moq=25)

        # Drop 4: BITS Pilani
        drop4 = Drop.objects.create(
            campus=bits_pilani,
            title='BITS Pilani Fest Merchandise',
            description='Official merchandise for BITS Pilani cultural fest',
            live=True
        )

        # Variants for Drop 4
        Variant.objects.create(drop=drop4, color='Maroon', size='M', moq=20)
        Variant.objects.create(drop=drop4, color='Maroon', size='L', moq=20)
        Variant.objects.create(drop=drop4, color='Yellow', size='M', moq=20)
        Variant.objects.create(drop=drop4, color='Yellow', size='L', moq=20)

        # Create some sample pledges
        self.stdout.write('Creating sample pledges...')
        navy_hoodie_m = Variant.objects.get(drop=drop1, color='Navy Blue', size='M')
        white_tshirt_l = Variant.objects.get(drop=drop2, color='White', size='L')

        Pledge.objects.create(user=student1, variant=navy_hoodie_m, quantity=2, paid=False)
        Pledge.objects.create(user=student2, variant=white_tshirt_l, quantity=1, paid=False)

        self.stdout.write(self.style.SUCCESS('Successfully loaded sample data!'))
        self.stdout.write(f'  - Created {Campus.objects.count()} campuses')
        self.stdout.write(f'  - Created {Drop.objects.count()} drops')
        self.stdout.write(f'  - Created {Variant.objects.count()} variants')
        self.stdout.write(f'  - Created {User.objects.filter(is_superuser=False).count()} sample users')
        self.stdout.write(f'  - Created {Pledge.objects.count()} sample pledges')
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('Sample User Accounts (All passwords: password123):'))
        self.stdout.write('')
        self.stdout.write(self.style.WARNING('STUDENTS:'))
        self.stdout.write('  - rahul_student (Rahul Sharma) - IIT Bombay student')
        self.stdout.write('  - priya_student (Priya Verma) - IIT Delhi student')
        self.stdout.write('  - amit_student (Amit Kumar) - BITS Pilani student')
        self.stdout.write('')
        self.stdout.write(self.style.WARNING('DROP HOSTS:'))
        self.stdout.write('  - host_iitb (Vikram Patel) - IIT Bombay drop host')
        self.stdout.write('  - host_iitd (Anjali Singh) - IIT Delhi drop host')
        self.stdout.write('')
        self.stdout.write(self.style.WARNING('CAMPUS CURATORS:'))
        self.stdout.write('  - curator_iitb (Rajesh Gupta) - IIT Bombay curator')
        self.stdout.write('  - curator_iitd (Meera Reddy) - IIT Delhi curator')
        self.stdout.write('')
        self.stdout.write(self.style.WARNING('GLOBAL ADMIN:'))
        self.stdout.write('  - admin_global (Sanjay Mehta) - Platform administrator')
        self.stdout.write('')
        self.stdout.write('Access the Django admin at: http://localhost:8000/admin')
