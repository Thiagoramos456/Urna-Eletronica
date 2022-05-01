using UrnaEFCore.Entities;

namespace UrnaBackend.Dtos
{
    public class CandidateUrnDto
    {
        public int Id { get; set; }

        public string? FullName { get; set; }

        public string? ViceCandidateName { get; set; }
    }
}
