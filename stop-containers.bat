echo "Stopping containers..."

docker stop student-enrollment-system-course_db-1
docker stop student-enrollment-system-student_db-1
docker stop student-enrollment-system-enrollement_db-1

echo "All containers stopped."
