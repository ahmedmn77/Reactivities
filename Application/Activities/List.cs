using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

// We are using mediator to mediate between API and Application projects. makes application project thin
namespace Application.Activities
{
    //** Use case: Return all activities **
    //type: query request mediator
    public class List
    {
        //This class determines what type of data returned also it may contain some prop to determine the exact records requested
        public class Query : IRequest<List<Activity>>{} 

        public class Handler : IRequestHandler<Query, List<Activity>> //takes Query and return list of activities
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }

    }

}
