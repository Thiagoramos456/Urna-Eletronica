namespace UrnaBackend.Models
{
    public class CandidateModel
    {
        public int Id { get; set; }

        public string? FullName { get; set; }

        public string? ViceCandidateName { get; set; }

        public DateTime RegistryDate { get; set; }

        public int? VoteNumber { get; set; }
    }
}
