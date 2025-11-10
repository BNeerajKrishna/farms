terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

    required_version = ">= 1.3.0"
    backend "s3" {
        bucket         = "kf-test-tf-state-bucket"
        key            = "state/terraform.tfstate"
        region         = "ap-south-1"
        use_lockfile   = true
        encrypt        = true
    }
}

provider "aws" {
  region = "ap-south-1" 
}

# Create a security group
resource "aws_security_group" "web_sg" {
  name        = "web-sg"
  description = "Allow SSH, HTTP, and React app traffic"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "React app"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Launch EC2 instance
resource "aws_instance" "my_ec2" {
  ami                    = "ami-02b8269d5e85954ef" 
  instance_type          = "t2.micro"
  key_name               = "ec2-key" 
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name = "githubactions-ec2-instance"
  }
}

output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.my_ec2.public_ip
}
