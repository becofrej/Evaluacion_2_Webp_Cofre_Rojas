from django.forms import ValidationError

class MaxSizeFileValidator:
    def __init__(self, max_file_size=5)
        self.max_file_size = max_file_size

        def __call__(self, value)