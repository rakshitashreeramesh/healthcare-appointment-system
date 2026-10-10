function Doctors() {
  const doctors = [
    {
      name: "Dr. Indumathy",
      specialty: "Pediatrics",
    },
    {
      name: "Dr. Ramesh",
      specialty: "Orthopedics",
    },
    {
      name: "Dr. Ambika",
      specialty: "General Medicine",
    },
  ];

  return (
    <div className="container mt-5">
      <h1>Our Doctors</h1>

      <div className="row mt-4">
        {doctors.map((doctor, index) => (
          <div className="col-md-4" key={index}>
            <div className="card p-3 mb-3 shadow-sm">
              <h4>{doctor.name}</h4>
              <p className="text-muted">{doctor.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;