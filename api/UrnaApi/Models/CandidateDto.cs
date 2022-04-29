using UrnaEFCore.Entities;

namespace UrnaBackend.Models
{
    public class CandidateDto
    {
        public int Id { get; set; }

        public string? FullName { get; set; }

        public string? ViceCandidateName { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? VoteNumber { get; set; }

    }
}
